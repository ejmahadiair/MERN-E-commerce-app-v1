import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import Carousel from "react-material-ui-carousel";
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { cartAction } from "../../actions/cartAction";
import { clearError, getProductDetails } from "../../actions/productActions";
import Loader from "../loader/Loader";
import MetaData from "../MetaData";
import Reviews from "../Reviews/Reviews";
import Starbordericon from "@material-ui/icons/StarBorder";
import "./productDetails.scss";
import { newReview } from "../../actions/reviewAction";
import { CLEAR_ERROR, NEW_REVIEW_RESET } from "../../constants/reviewConstants";
const ProductDetails = () => {
  const dispatch = useDispatch();
  const { loading, product, error } = useSelector(
    (state) => state.productDetails
  );
  const { isAuthenticated } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.addToCart);
  const review = useSelector((state) => state.newReview);
  const { orders } = useSelector((state) => state.myOrders);
  const navigate = useNavigate();
  const params = useParams();
  const alert = useAlert();
  //control description and review container
  const [isDesOrRev, setIsDesOrRev] = useState(true);
  //
  //Quentity control
  const [quantity, setQuentity] = useState(1);

  const quantityHandler = (value) => {
    switch (value) {
      case "increase":
        if (product.Stock > quantity) {
          setQuentity(quantity + 1);
          if (quantity >= 5) {
            setQuentity(5);
          }
        }
        break;
      case "decrease":
        setQuentity(quantity - 1);
        if (quantity <= 1) {
          setQuentity(1);
        }
        break;

      default:
        break;
    }
  };
  //

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth <= 600 ? 15 : 20,
    value: product.ratings,
    isHalf: true,
  };

  //contorl captcha number
  const [ok, setOk] = useState("");
  const [fnum, setFnum] = useState(0);
  const [snum, setSnum] = useState(0);
  const [gsum, setGsum] = useState();
  const [sum, setSum] = useState("");
  //
  //review states
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  //
  //ratinghandler
  const [star1, setStar1] = useState(false);
  const [star2, setStar2] = useState(false);
  const [star3, setStar3] = useState(false);
  const [star4, setStar4] = useState(false);
  const [star5, setStar5] = useState(false);

  useEffect(() => {
    if (rating >= 1) {
      setStar1(true);
    } else {
      setStar1(false);
    }
    if (rating >= 2) {
      setStar2(true);
    } else {
      setStar2(false);
    }
    if (rating >= 3) {
      setStar3(true);
    } else {
      setStar3(false);
    }
    if (rating >= 4) {
      setStar4(true);
    } else {
      setStar4(false);
    }
    if (rating >= 5) {
      setStar5(true);
    } else {
      setStar5(false);
    }
  }, [rating]);
  const ratingHandler = (star) => {
    switch (star) {
      case 1:
        setRating(1);

        break;
      case 2:
        setRating(2);
        break;
      case 3:
        setRating(3);
        break;
      case 4:
        setRating(4);
        break;
      case 5:
        setRating(5);
        break;

      default:
        setRating(0);
        break;
    }
  };

  const captcha = () => {
    let a = Math.floor(Math.random() * 100 + 1);
    let b = Math.floor(Math.random() * 100 + 1);
    let sum = a + b;
    return [a, b, sum];
  };

  useEffect(() => {
    let capdata = captcha();
    setFnum(capdata[0]);
    setSnum(capdata[1]);
    setGsum(capdata[2]);
  }, []);

  const isThisUserOrderIt = (orders) => {
    for (let i = 0; i < orders.length; i++) {
      if (orders[i].orderItem[0].product === params.id) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const reviewData = {
      rating,
      comment,
      productId: params.id,
    };
    let orderByThisUser = isThisUserOrderIt(orders);
    if (isAuthenticated && orders.length !== 0 && orderByThisUser) {
      if (Number(gsum) === Number(sum)) {
        dispatch(newReview(reviewData));
        setOk("YES");
        let capdata = captcha();
        setFnum(capdata[0]);
        setSnum(capdata[1]);
        setGsum(capdata[2]);
        setSum("");
      } else {
        setOk("NO");
        let capdata = captcha();
        setFnum(capdata[0]);
        setSnum(capdata[1]);
        setGsum(capdata[2]);
        setSum("");
        alert.error("Captcha Did not matched!");
      }
    } else if (!isAuthenticated) {
      alert.error("You are not Authenticated please Login first");
      let capdata = captcha();
      setFnum(capdata[0]);
      setSnum(capdata[1]);
      setGsum(capdata[2]);
      setSum("");
    } else if (!orderByThisUser) {
      if (Number(gsum) === Number(sum)) {
        setOk("YES");
        let capdata = captcha();
        setFnum(capdata[0]);
        setSnum(capdata[1]);
        setGsum(capdata[2]);
        setSum("");
        alert.error("You did not order this product");
      } else if (Number(gsum) !== Number(sum)) {
        setOk("NO");
        let capdata = captcha();
        setFnum(capdata[0]);
        setSnum(capdata[1]);
        setGsum(capdata[2]);
        setSum("");
        alert.error("Captcha Did not matched!");
      } else {
        alert.error("You did not order this product");
      }
    }
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (review.error) {
      alert.error(review.error);
      dispatch(CLEAR_ERROR());
    }
    if (review.success) {
      alert.success("Review submited succeessfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }

    dispatch(getProductDetails(params.id));
  }, [dispatch, params.id, alert, error, review.error, review.success]);

  //add to cart control

  console.log("cartItems ", cartItems);

  const existcart = cartItems.find((x) => x._id === params.id);

  const cartHandler = () => {
    if (isAuthenticated) {
      if (!existcart) {
        dispatch(cartAction(params.id));
        alert.success("Product added to the cart");
      } else {
        alert.error("This product Already in your cart");
      }
    } else {
      alert.error("You are not Authenticated Please Login or Register");
      navigate("/account");
    }
  };
  //
  //Order Control
  const orderHandler = () => {
    if (isAuthenticated && product.Stock > 0) {
      navigate(`/order`);
      localStorage.setItem("quantity", quantity);
    } else if (product.Stock <= 0) {
      alert.error("This product is Out of stock");
    } else {
      alert.error("You are not Authenticated Please Login or Register");
      navigate("/account");
    }
  };
  //

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="product-details-container">
            <MetaData title={`${product.name} | of EJ-COMMERS`} />
            <div className="image-container">
              <Carousel>
                {product.images &&
                  product.images.map((item, i) => {
                    return (
                      <div key={item._id} className="Carosole-image-container">
                        <img
                          src={item.url}
                          alt={`${i} slide`}
                          className="Carosole-image"
                        />
                      </div>
                    );
                  })}
              </Carousel>
            </div>
            {/*  */}
            <div className="details-contaner">
              <div className="details-container-control">
                {/*  */}
                <div className="section detail-sectio1">
                  <h1>{product.name}</h1>
                  <p>Product Id: {product._id}</p>
                  <hr />
                </div>
                {/*  */}
                <div className="section detail-sectio2">
                  <div className="sub-section-review">
                    <ReactStars {...options} />{" "}
                    <span className="toatal-reviews">
                      ({product.numOfReviews} reviews)
                    </span>
                  </div>

                  <hr />
                </div>
                {/*  */}
                <div className="section detail-sectio3">
                  <h1>${product.price}</h1>
                  <div className="sub-section">
                    <div className="quantity">
                      <button
                        type="button"
                        onClick={() => quantityHandler("decrease")}
                        className="selection-off"
                      >
                        -
                      </button>
                      <div className="numberOfQuentity">
                        <p className="selection-off">{quantity}</p>
                      </div>
                      <button
                        className="selection-off"
                        type="button"
                        onClick={() => quantityHandler("increase")}
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      className="Add-to-cart"
                      onClick={cartHandler}
                    >
                      Add to Cart
                    </button>
                  </div>
                  <hr />
                </div>
                {/*  */}
                <div className="section detail-sectio4">
                  <p
                    className={product.Stock > 0 ? "in-stock" : "out-of-stock"}
                  >
                    Status:{" "}
                    <span>
                      {product.Stock > 0 ? "In Stock" : "Out of Stock"}
                    </span>
                  </p>
                  <hr />
                </div>
                {/*  */}

                <button
                  className="buy-now"
                  type="button"
                  onClick={orderHandler}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
          <div className="review-details-container">
            <div className="card-title-container for-spacification">
              <h2 className="card-title" onClick={() => setIsDesOrRev(true)}>
                Description And Spacification
              </h2>
              <div
                className={isDesOrRev ? "card-hr active-hr" : "card-hr"}
              ></div>
            </div>
            <div className="card-title-container for-review">
              <h2 className="card-title" onClick={() => setIsDesOrRev(false)}>
                REVIEWS
              </h2>
              <div
                className={!isDesOrRev ? "card-hr active-hr" : "card-hr"}
              ></div>
            </div>
          </div>
          <hr className="review-details-breakline" />

          {isDesOrRev ? (
            <div className="description-container">
              <h2 className="description-title">{`${product.name}`}</h2>
              <div className="spacification">
                <h3>Description/Spacification</h3>
                <p className="spacification-detail">{product.description}</p>
              </div>
            </div>
          ) : (
            <div className="review-container">
              <div className="post-review">
                <h2 className="post-tag">Post A Review</h2>
                <form className="post-review-container" onSubmit={handleSubmit}>
                  <div className="give-product-rating">
                    <div className="rating-title">
                      <h3>Give Rating</h3>
                      <span>*</span>
                      <div className="rating-icon-container">
                        <div
                          className={
                            star1 ? "star star1 activeStar" : "star star1"
                          }
                          onClick={() => ratingHandler(1)}
                        >
                          <Starbordericon className="icon" />
                        </div>
                        <div
                          className={
                            star2 ? "star star2 activeStar" : "star star1"
                          }
                          onClick={() => ratingHandler(2)}
                        >
                          <Starbordericon className="icon" />
                        </div>
                        <div
                          className={
                            star3 ? "star star3 activeStar" : "star star3"
                          }
                          onClick={() => ratingHandler(3)}
                        >
                          <Starbordericon className="icon" />
                        </div>
                        <div
                          className={
                            star4 ? "star star4 activeStar" : "star star4"
                          }
                          onClick={() => ratingHandler(4)}
                        >
                          <Starbordericon className="icon" />
                        </div>
                        <div
                          className={
                            star5 ? "star star5 activeStar" : "star star5"
                          }
                          onClick={() => ratingHandler(5)}
                        >
                          <Starbordericon className="icon" />
                        </div>
                        <p className="showRating">({rating})</p>
                      </div>
                    </div>
                  </div>
                  <div className="rating-comment">
                    <div>
                      <h4>Comment</h4>
                      <span>*</span>
                    </div>
                    <textarea
                      id="comment-area"
                      rows=""
                      cols=""
                      required
                      value={comment}
                      onChange={(e) => {
                        setComment(e.target.value);
                      }}
                    ></textarea>
                  </div>
                  <div className="Are-you-humna">
                    <div className="captcha">
                      <h3>{fnum}</h3>
                      <p>+</p>
                      <h3>{snum}</h3>
                    </div>
                    <input
                      type="text"
                      name="sum"
                      value={sum}
                      onChange={(e) => setSum(e.target.value)}
                      required
                    />
                  </div>

                  <button type="submit">Submit</button>
                </form>
                <p>
                  {ok.toString() === "YES"
                    ? "Captcha matched"
                    : "Captcha dose not matched try again"}
                </p>
              </div>
              <div className="post-show-brakline"></div>
              <div className="show-review">
                {product.reviews && product.reviews[0] ? (
                  product.reviews.map((item) => {
                    return <Reviews key={item._id} review={item} />;
                  })
                ) : (
                  <h2 className="no-review">No Review</h2>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ProductDetails;
