const express = require("express");
const { isAuthenticatedUser, authorizeRole } = require("../middleware/auth");
const {
  newOrder,
  getSingleOrder,
  myOrder,
  getAllOrders,
} = require("../controllers/orderController");
const router = express.Router();

router.route("/order/new").post(isAuthenticatedUser, newOrder);
router
  .route("/order/:id")
  .get(isAuthenticatedUser, getSingleOrder);
router.route("/myorders").get(isAuthenticatedUser, myOrder);
router.route('/allorders').get(isAuthenticatedUser, getAllOrders);

module.exports = router;
