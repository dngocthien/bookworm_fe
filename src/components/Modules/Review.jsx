import React, { useState } from "react";
import "./Module.css";

const Review = ({ review }) => {
  const convertDate = (date) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const d = new Date(date);
    return (
      monthNames[d.getMonth()] + " " + d.getDay() + ", " + (1900 + d.getYear())
    );
  };
  return (
    <div>
      <div className="frame-start review">
        <h1>{review.reviewTitle}</h1>
        <p>| {review.ratingStar} stars</p>
      </div>
      <p>{review.reviewDetails}</p>
      <p className="review-time">{convertDate(review.reviewDate)}</p>
      <hr />
    </div>
  );
};

export default Review;
