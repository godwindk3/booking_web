import React, { useState, useEffect } from 'react';
import axios from '../Home/axiosConfig';
import TakeAccommodationByBookingId from './TakeAccommodationByBookingId';
import DeleteBookingButton from './DeleteBookingButton';
import DeleteReviewButton from './DeleteReviewButton';
const GetAllReviewOfUser = ({ userId }) => {
  const [userReviews, setUserReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserReviews = async () => {
      try {
        // Send GET request to fetch user reviews
        const response = await axios.get(`/review/get_user_reviews/${userId}`);
        // Update state with the received reviews
        setUserReviews(response.data);
      } catch (error) {
        console.error('Error fetching user reviews:', error);
        // setError('Error fetching user reviews. Please try again.');
      }
    };

    // Fetch user reviews when the component mounts
    fetchUserReviews();
  }, [userId]); // Include userId in the dependency array to refetch when it changes

  return (
    <div>
      {/* <h2>Tổng hợp các review của bạn</h2> */}
      {error && <p>{error}</p>}
      <ul>
        {userReviews.map((review) => (
          <li key={review.id}>
            <TakeAccommodationByBookingId bookingId={review.bookingID}/>
            <DeleteReviewButton reviewId={review.id}/>
            <p>Rating: {review.rating}</p>
            <p>Comment: {review.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GetAllReviewOfUser;
