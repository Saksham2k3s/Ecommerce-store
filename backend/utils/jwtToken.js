const jwt = require("jsonwebtoken");

const sendToken = (user, statusCode, res) => {
  // Create JWT token
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  // Options for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  // Send token in response
  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        // Add any additional user data you want to send in the response
      },
      token,
    });
};

module.exports = sendToken;
