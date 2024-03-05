const express = require("express");
const {
  userRegistration,
  userLogin,
  userLogout,
  forgetPassword,
  resetPassword,
  getUserDetails,
  updateProfile,
  updatePassword,
  getAllUser,
  getSingleUser,
  deleteUserProfile,
} = require("../controllers/userController");
const router = express.Router();
const { isAuthenticatedUser, authorizeRole } = require("../middleware/auth");

router.route("/register").post(userRegistration);
router.route("/login").post(userLogin);
router.route("/password/forgot").post(forgetPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").get(userLogout);
router.route("/profile").get(isAuthenticatedUser, getUserDetails);
router.route("/password/update").put(isAuthenticatedUser, updatePassword);
router.route("/profile/update").put(isAuthenticatedUser, updateProfile);
router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizeRole("admin"), getAllUser);
router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizeRole("admin"), getSingleUser);

  router
  .route("/admin/user/delete/:id")
  .delete(isAuthenticatedUser, authorizeRole("admin"), deleteUserProfile);

module.exports = router;
