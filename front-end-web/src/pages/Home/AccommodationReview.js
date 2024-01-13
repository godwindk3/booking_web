import React, { useState, useEffect } from 'react';
import axios from './axiosConfig';

import './AccommodationReview.css'
import UserProfile from './GetUserNameById';

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
      {/* <h2>Accommodation Reviews</h2> */}
      <div className="get-acco-review-card">
        {reviews.map((review) => (
          <ul className='get-acco-review-ul' key={review.id}>
            {/* <li>Booking ID: {review.bookingID}</li> */}

            {/* <div className='get-your-review'>
              <div>User ID {review.userID}</div>

              <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
              {generateRatingStars(review.rating)}
              {generateUnratedStars(review.rating)}
            </div> */}

            <div className='get-your-review'> 
              <UserProfile userId={review.userID}/> 
              <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
              {generateRatingStars(review.rating)}
              {generateUnratedStars(review.rating)}
            </div>
            <>Comment: {review.comment}</>
            
          </ul>
        ))}
      </div>
    </div>
  );
};

export default AccommodationReview;
