const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  addUsersReview,
  getAllReviews,
  deleteReview,
} = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRole } = require("../middleware/auth");

const router = express.Router();

// Define route for getting all products
router
  .route("/products")
  .get(getAllProducts);
  
router
  .route("/admin/product/new")
  .post(isAuthenticatedUser, authorizeRole("admin"), createProduct);
  
router
  .route("admin/product/update/:id")
  .put(isAuthenticatedUser, authorizeRole("admin"), updateProduct);
router
  .route("admin/product/delete/:id")
  .delete(isAuthenticatedUser, authorizeRole("admin"), deleteProduct);

router.route("/product/details/:id").get(getProductDetails);
router.route("/review").put(isAuthenticatedUser, addUsersReview);
router.route('/allreviews').get(getAllReviews).delete(isAuthenticatedUser, deleteReview);

module.exports = router;
