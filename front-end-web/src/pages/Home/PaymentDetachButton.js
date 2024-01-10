import React from 'react';
import axios from './axiosConfig';
import './PaymentDetachButton.css';

const PaymentDetachButton = ({ accommodationId, paymentId }) => {
  const handleDetach = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(
        `/accommodation/${accommodationId}/remove_payment/${paymentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Payment method removed successfully');
      // Additional logic after successful removal
      // You may want to update the UI or perform other actions
    } catch (error) {
      console.error('Error during payment removal:', error.message);
    }
  };

  return (
    <button className='detach-payment-method-button' onClick={handleDetach}>x</button>
  );
};

export default PaymentDetachButton;
