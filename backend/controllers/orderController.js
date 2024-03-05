const Order = require("../models/orderModal");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apiFeatures");

//create new order

exports.newOrder = catchAsyncError(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt : Date.now(),
    user: req.user._id
  });
  res.status(201).json({
    success: true,
    order,
  });
});

//get Single order
exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');

  if(!order){
    return next(new ErrorHandler("Order not found ", 404));
  }

  res.status(200).json({
    success : true,
    order
  })
});

//get Your Order
exports.myOrder = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find({user : req.user._id});

  res.status(200).json({
    success : true,
    orders
  });
});

// Get All Orders -- Admin

exports.getAllOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find();
  
  let totalAmount = 0;

  orders.forEach((order) => {
     totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success : true,
    totalAmount,
    orders
  })
});

// Update Order Status -- Admin

exports.updateOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find(req.params.id);
  if(orders.orderStatus === 'Delieverd'){
    return next(new ErrorHandler('You have already delivered this order', 404));
  }
  res.status(200).json({
    success : true,
    orders
  })
});

