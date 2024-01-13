import React, { useState, useEffect } from 'react';
import axios from '../Home/axiosConfig';
import TakeAccommodationByBookingId from './TakeAccommodationByBookingId';
import DeleteBookingButton from './DeleteBookingButton';
import DeleteReviewButton from './DeleteReviewButton';

import './GetAllReviewOfUser.css'

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

  const generateRatingStars = (rating) => {
    const stars = [];

    for (let i = 0; i < rating; i++) {
      stars.push(<span key={i} className="fa fa-star checked"></span>);
    }

    return stars;
  };

  const generateUnratedStars = (rating) => {
    const stars = [];
    const unrated = 5 - rating;
    for (let i = 0; i < unrated; i++) {
      stars.push(<span key={i} className="fa fa-star"></span>);
    }

    return stars;
  };

  return (
    <div>
      {/* <h2>Tổng hợp các review của bạn</h2> */}
      {error && <p>{error}</p>}
      <ul>
        {userReviews.map((review) => (
          <li className='get-your-review-li' key={review.id}>
            <div className='get-your-review'>

              <div>
                <div className='get-your-review reviewed-hotel-name'>
                  <TakeAccommodationByBookingId bookingId={review.bookingID}/>
                  
                  {/* <div>Rating: {review.rating}</div>

                  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
                  <span class="fa fa-star checked"></span>
                  <span class="fa fa-star checked"></span>
                  <span class="fa fa-star checked"></span>
                  <span class="fa fa-star"></span>
                  <span class="fa fa-star"></span> */}

                  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
                  {generateRatingStars(review.rating)}
                  {generateUnratedStars(review.rating)}
                </div>

                <div className='your-review-comment'>Comment: {review.comment}</div>
              </div>
              
              <div className='your-review-delete-button-container'>
                <DeleteReviewButton reviewId={review.id}/>
              </div>

            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GetAllReviewOfUser;
