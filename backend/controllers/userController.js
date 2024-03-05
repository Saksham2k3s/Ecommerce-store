const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/userModal");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const cloudinary = require('cloudinary')
const crpyto = require("crypto");
exports.userRegistration = catchAsyncError(async (req, res, next) => {
 
 const myCloud = cloudinary.v2.uploader.upload(req.body.avatar, {
  folder : 'avatars',
  width : 150,
  crop : 'scale'
 });

  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: (await myCloud).public_id,
      url:  (await myCloud).secure_url,
    },
  });

  sendToken(user, 201, res);
});

// Login user

exports.userLogin = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  
  // check if user enter email and password both

  if (!email && !password) {
    return next(new ErrorHandler("Please enter email and password", 400));
  }

  const user = await User.findOne({ email: email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Wrong email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Wrong email or password", 401));
  }

  sendToken(user, 200, res);
});

exports.userLogout = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

//forgot password

exports.forgetPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("No user found", 404));
  }

  //get reset password token
  const resetToken = user.getResetPassword();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl}  \n\n  if you have not request this please ignore this`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Ecommerce password recovery",
      message: message,
    });

    res.status(200).json({
      success: true,
      message: `Email to ${user.email} sent successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

exports.resetPassword = catchAsyncError(async (req, res, next) => {
  // Creating token hash
  const resetPasswordToken = crpyto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(new ErrorHandler("Token expried", 404));
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(
      new ErrorHandler("Password and confirm password are not match", 404)
    );
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  sendToken(user, 200, res);
});

//Get Users details

exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  console.log("finding user by id");
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

// Update password

exports.updatePassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isMatchPassword = await user.comparePassword(req.body.oldPassword);

  if (!isMatchPassword) {
    return next(new ErrorHandler("Old password is not correct", 404));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(
      new ErrorHandler("Password and confirm password are not match", 404)
    );
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
  res.status(200).json({
    success: true,
    user,
  });
});

exports.updateProfile = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  const user = await User.findByIdAndUpdate(req.body.user, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

exports.getAllUser = catchAsyncError(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

exports.getSingleUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with id : ${req.params.id}`)
    );
  }
  res.status(200).json({
    success: true,
    user,
  });
});

// Update user role

exports.updateUserRole = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.body.user, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

//Delete user by admin

exports.deleteUserProfile = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with id : ${req.params.id}`)
    );
  }

await User.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    message: "user deleted successfully",
  });
});
