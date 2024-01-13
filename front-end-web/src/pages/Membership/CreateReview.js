import React, { useState } from 'react';
import axios from '../Home/axiosConfig';

import './CreateReview.css'

const CreateReview = ({ bookingId, userId }) => {
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');
  const [reviewData, setReviewData] = useState(null);
  const [error, setError] = useState(null);

  const handleRatingChange = (e) => {
    setRating(parseInt(e.target.value, 10));
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCreateReview = async () => {
    try {
      // Send POST request to create a review
      const response = await axios.post('/review/create', {
        bookingID: bookingId,
        userID: userId,
        rating: rating,
        comment: comment,
      });

      // Update the reviewData state with the response data
      setReviewData(response.data);
    } catch (error) {
      console.error('Error creating review:', error);
      setError('Error creating review. Please try again.');
    }
  };

  return (
    <div>
      <h2 className='cam-nhan-cua-ban-header'>Cảm nhận của bạn?</h2>

      <div className='your-booked-card-hotel-detail-div'>
        <div className='your-booked-checin-checkout-container'>

          <div className='your-booked-rating-comment'>
            <div>
              <label htmlFor="rating">Rating: </label>
              <input
                type="number"
                id="rating"
                value={rating}
                min="1"
                max="5"
                onChange={handleRatingChange}
              />
            </div>

            <div>
              <label htmlFor="comment">Comment: </label>
              <input className='your-booked-comment-input' id="comment" value={comment} onChange={handleCommentChange}></input>
            </div>
          </div>

          <button className='your-booked-create-review-button' onClick={handleCreateReview}>Tạo review</button>
        </div>
      </div>

      {/* {reviewData && (
        <div>
          <h3>Your Review</h3>
          <p>Rating: {reviewData.rating}</p>
          <p>Comment: {reviewData.comment}</p>
          <p>reviewID: {reviewData.id}</p>
        </div>
      )} */}

      {error && <p>{error}</p>}
    </div>
  );
};

export default CreateReview;
