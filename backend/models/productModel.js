const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name : {
       type : String,
        required : [true, "Please Enter the Name"],
        trim : true
    },
    description : {
         type : String,
         required : [true, "Please Enter the Description"]
    },
    price : {
        type : Number,
        required : [true, "Please Enter the Price"],
        maxLenght : [8, "Price can't be exceed 8 digits"]
   },
    ratings : {
    type : Number,
    default : 0
},
images : [
   { 
    public_id : {
        type : String,
        required : true
    },
    url : {
        type : String,
        required : true
    }
}
],
category : {
    type : String,
    required : [true, "Please Enter product category"]
},
stock : {
    type : Number,
    required : [true, 'Please enter product stock'],
    maxLenght : [4,"Price can't be exceed 8 digits"],
    default : 1
},
numOfReviews : {
    type : Number,
    default : 0
},
reviews : [
    {
        user: {
            type : mongoose.Schema.ObjectId,
            ref : 'User',
            required : true,
          },
        name : {
            type : String,
            required : true
        },
        rating : {
            type : Number,
            required : true
        },
        comment : {
            type : String,
            required : true
        }
    }
],
user: {
  type : mongoose.Schema.ObjectId,
  ref : 'User',
  required : true,
},
createAt : {
   type : Date,
   default : Date.now
}
});

module.exports = mongoose.model("products", productSchema)