import React, { useState, useEffect } from 'react';
import axios from './axiosConfig';

const AccommodationReview = ({ accommodationId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // Send a GET request to fetch reviews for the given accommodation ID
        const response = await axios.get(`/review/get_reviews_of_accommodation/${accommodationId}`);

        // Update the state with the received reviews
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        // Handle error
      }
    };

    fetchReviews();
  }, [accommodationId]);

  return (
    <div>
      <h2>Accommodation Reviews</h2>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <p>Booking ID: {review.bookingID}</p>
            <p>Comment: {review.comment}</p>
            <p>Rating: {review.rating}</p>
            <p>User ID: {review.userID}</p>
            <p>-------------------------------------------</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AccommodationReview;
