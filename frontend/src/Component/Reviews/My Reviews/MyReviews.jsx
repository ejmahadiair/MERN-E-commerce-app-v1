import React from "react";
import { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { clearError, getAllProducts } from "../../../actions/productActions";
import Loader from "../../loader/Loader";
import "./myReviews.scss";
import Review from "./Review/Review";
const MyReviews = () => {
  const { loading, error, products } = useSelector(
    (state) => state.getProducts
  );
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const alert = useAlert();
  useEffect(() => {
    if (error) {
      alert.error("Review not found");
      dispatch(clearError());
    }
    dispatch(getAllProducts());
  }, [alert, dispatch, error]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="my-reviews-container">
          {products &&
            products.map((item) => {
              return (
                <div key={item._id}>
                  {item.reviews.length !== 0 &&
                    item.reviews.map((rev) => {
                      return (
                        <div key={rev._id}>
                          {rev.user === user._id && (
                            <Review
                              name={rev.name}
                              id={rev._id}
                              rating={rev.rating}
                              comment={rev.comment}
                            />
                          )}
                        </div>
                      );
                    })}
                </div>
              );
            })}
        </div>
      )}
    </>
  );
};

export default MyReviews;
