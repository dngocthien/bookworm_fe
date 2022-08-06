import React, { useState } from "react";

const Review = ({ review }) => {
  return (
    <div>
      <div className="frame-start review">
        <h1>{review.reviewTitle}</h1>
        <p>{review.ratingStar}</p>
      </div>
      <p>{review.reviewDetails}</p>
      <p>{review.reviewDate}</p>
      <hr />
    </div>
  );
};

export default Review;
