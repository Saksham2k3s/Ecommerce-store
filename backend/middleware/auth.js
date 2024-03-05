const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../models/userModal");

exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  console.log("Checking token");
  const { token } = req.cookies;
  console.log("This is token in cookie", token);
 
  if (!token) {
    return next(new ErrorHandler("Please Login to access this resourse", 401));
  }

  const decodeData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decodeData.id);

  next();
});

exports.authorizeRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.user.role} is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};
