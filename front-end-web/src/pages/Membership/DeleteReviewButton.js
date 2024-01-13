import React from 'react';
import axios from '../Home/axiosConfig';

import './DeleteReviewButton.css'

const DeleteReviewButton = ({ reviewId }) => {
  const handleDelete = async () => {
    try {
      // Retrieve the token from local storage
      const token = localStorage.getItem('token');

      // If the token is not present, handle the error or redirect to login
      if (!token) {
        // Handle the case where the token is not present
        console.error('User not authenticated');
        return;
      }

      // Send DELETE request to delete the review with token validation
      await axios.delete(`/review/delete/${reviewId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(`Review with ID ${reviewId} deleted successfully`);
      alert('Review deleted successfully')
    } catch (error) {
      console.error(`Error deleting review with ID ${reviewId}:`, error);
      // Handle the error or display a notification to the user
    }
  };

  return (
    <button className='user-delete-review-button' onClick={handleDelete}>Xoá Review</button>
  );
};

export default DeleteReviewButton;
