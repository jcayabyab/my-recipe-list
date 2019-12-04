import React from "react";
import Review from "./Review";
import CreateReviewForm from "./CreateReviewForm";

const Reviews = ({ reviews, handleSubmitReview }) => {
  return (
    <div>
      <CreateReviewForm handleSubmitReview={handleSubmitReview}></CreateReviewForm>
      {reviews.map(review => (
        <Review key={review.reviewId} review={review}></Review>
      ))}
    </div>
  );
};

export default Reviews;
