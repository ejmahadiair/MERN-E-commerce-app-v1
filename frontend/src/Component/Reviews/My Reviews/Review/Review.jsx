import React from "react";

const Review = ({ name, id, rating, comment }) => {
  return (
    <>
      <div className="my-review-container">
        <h1>{name}</h1>
        <p>{id}</p>
        <p>{rating}</p>
        <p>{comment}</p>
      </div>
    </>
  );
};

export default Review;
