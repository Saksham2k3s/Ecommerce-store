import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productDetails } from "../../Redux/slice/productDetails";
import { useParams } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import { Rating } from "@mui/material";
import ReviewCard from "./ReviewCard";
import Loading from '../../components/layout/Loading/Loading'
import {Dialog, DialogActions, DialogContent, DialogTitle, Button} from "@mui/material";
import "./Details.css";
function Details() {
  const { isLoading, isError, product } = useSelector(
    (state) => state.productDetails
  );
  const dispatch = useDispatch();
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const options = {
    size: "large",
    value: product.ratings ? product.ratings : "",
    readOnly: true,
    precision: 0.5,
  };
  useEffect(() => {
    dispatch(productDetails(id));
  }, [dispatch, id]);

  const images = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZgy53CHdGwNM0sXfP9S_hkqs1PSkPJrty2Dp9C-_716ZTK4V5lNnNPxDLqmvWmSu-h_c&usqp=CAU",
    "https://ttbazaar.com/cdn/shop/products/TS078_MAROON_FRONT.jpg?v=1623061994",
    "https://cdn.vastrop.com/products/SimpleisneverEasyMenRoundNeckHalfSleeveTShirt.webp",
  ];

  const increaseQuantity = () => {
    if (product.Stock <= quantity) return;

    const qty = quantity + 1;
    console.log(qty);
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

  const submitReviewToggle = () => {

  };

  const reviewSubmitHandler = () => {
    
  };

  if(isLoading){
    return (
      <>
      <Loading />
      </>
    )
  }

  return (
    <>
      <div className="productDetails">
        <div>
          <Carousel>
            {images.map((image, i) => (
              <img
                src={image}
                alt={`${i} Slide`}
                className="CarouselImage"
                key={image}
              />
            ))}
          </Carousel>
        </div>
        <div>
          <div className="detailsBlock-1">
            <h2>{product.name}</h2>
            <p>Product ID :- {product._id}</p>
          </div>
          <div className="detailsBlock-2">
            <Rating {...options} />
            <span className="detailsBlock-2-span">
              {" "}
              ({product.numOfReviews} Reviews)
            </span>
          </div>

          <div className="detailsBlock-3">
            <h1>{`₹${product.price}`}</h1>
            <div className="detailsBlock-3-1">
              <div className="detailsBlock-3-1-1">
                <button onClick={decreaseQuantity}>-</button>
                <input
                  readOnly
                  type="number"
                  className="quantity"
                  value={quantity}
                />
                <button onClick={increaseQuantity}>+</button>
              </div>
              <button>Add to Cart</button>
            </div>

            <p>
              Status:
              <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                {product.Stock < 1 ? "OutOfStock" : "InStock"}
              </b>
            </p>
          </div>
          <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
              </div>

              <button  className="submitReview">
                Submit Review
              </button>
              <div>

              </div>
        </div>
      </div>

      <h3 className="reviewsHeading">REVIEWS</h3>

<Dialog
  aria-labelledby="simple-dialog-title"
  open={open}
  onClose={submitReviewToggle}
>
  <DialogTitle>Submit Review</DialogTitle>
  <DialogContent className="submitDialog">
    <Rating
      onChange={(e) => setRating(e.target.value)}
      value={rating}
      size="large"
    />

    <textarea
      className="submitDialogTextArea"
      cols="30"
      rows="5"
      value={comment}
      onChange={(e) => setComment(e.target.value)}
    ></textarea>
  </DialogContent>
  <DialogActions>
    <Button onClick={submitReviewToggle} color="secondary">
      Cancel
    </Button>
    <Button onClick={reviewSubmitHandler} color="primary">
      Submit
    </Button>
  </DialogActions>
</Dialog>

{product.reviews && product.reviews[0] ? (
  <div className="reviews">
    {product.reviews &&
      product.reviews.map((review) => (
        <ReviewCard key={review._id} review={review} />
      ))}
  </div>
) : (
  <p className="noReviews">No Reviews Yet</p>
)}
    </>
  );
}

export default Details;
