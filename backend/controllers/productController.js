// Import necessary modules
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apiFeatures");

// create product -- Admin
exports.createProduct = catchAsyncError(async (req, res, next) => {
  console.log("Adding product");
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

//  get all products
exports.getAllProducts = catchAsyncError(async (req, res) => {
  const resultPerPage = 5;
  const countProducts = await Product.countDocuments();
  const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage)
    const result = await apiFeatures.query
 console.log("result", result);
  res.status(200).json({
    success: true,
    result,
    countProducts,
    resultPerPage,
    
  });
});

//update product -- Admin

exports.updateProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    returnValidator: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

exports.deleteProduct = async (req, res, next) => {
  try {
    const result = await Product.deleteOne({ _id: req.params.id });

    if (result.deletedCount === 0) {
      return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully!",
    });
  } catch (error) {
    console.error(error);
    return next(new ErrorHandler("Internal server error", 500));
  }
};

//Get Product Details

exports.getProductDetails = catchAsyncError(async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }
    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error(error);
    return next(new ErrorHandler("Internal server error", 500));
  }
});

// Create Review By User or Update

exports.addUsersReview = catchAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };
  const product = await Product.findById(productId);
  const isReviewd = await product.reviews.find(
    (rev) => rev.user.toString() === req.user._id
  );
  if (isReviewd) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id) {
        (rev.rating = rating), (rev.comment = comment);
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }
  let avg = 0;
  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get All reviews
exports.getAllReviews = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

//Delete Review

exports.deleteReview = catchAsyncError(async (req, res, next) => {
  console.log("1");
  const product = await Product.findById(req.query.productId);
  console.log("2");
  console.log(product);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const reviews = product.reviews.filter(
    (review) => review._id.toString() !== res.query.productId.toString()
  );

  let avg = 0;
  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  const rating = avg / reviews.length;
  const numOfReviews = reviews.length;

  await product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      rating,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});
