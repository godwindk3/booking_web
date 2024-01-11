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
      {/* <h2>Accommodation Reviews</h2> */}
      <ul>
        {reviews.map((review) => (
          <ul key={review.id}>
            {/* <li>Booking ID: {review.bookingID}</li> */}
            <li>User ID {review.userID} rated: {review.rating}</li>
            <>Comment: {review.comment}</>
            
          </ul>
        ))}
      </ul>
    </div>
  );
};

export default AccommodationReview;
