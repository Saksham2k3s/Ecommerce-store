const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crpyto = require('crypto')
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter your Name"],
    maxLength: [20, "Name can't have more then 20 characters "],
    minLength: [4, "Name should have more then 4 characters"],
  },
  email: {
    type: String,
    required: [true, "Please Enter your Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter your password"],
    minLength: [8, "Name should have more then 8 characters"],
    select: false, // that means when we fetch user data it will give all things execpt password
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },

  role: {
    type: String,
    default: "user",
  },

  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre('save', async function(next){

    if(!this.isModified('password')){
        next();
    }

    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.getJWTToken = function(){
    return jwt.sign({id : this._id}, process.env.JWT_SECRET, {
        expiresIn : process.env.JWT_EXPIRES
    });
}

userSchema.methods.comparePassword = async function(enterPassword){
  console.log("I am chaking pass");
  return await bcrypt.compare(enterPassword, this.password);
};

//Generating password Reset Token
userSchema.methods.getResetPassword = async function() {
  //Generating Token
  
  const resetToken = crpyto.randomBytes(20).toString("hex");
  
  //Hashing and add to user schema
  this.resetPasswordToken = crpyto.createHash('sha256').update(resetToken).digest('hex');
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  return resetToken;


};

module.exports = mongoose.model("Users", userSchema);
