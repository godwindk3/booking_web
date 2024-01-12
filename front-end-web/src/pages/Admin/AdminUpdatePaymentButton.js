import React, { useState } from 'react';
import axios from '../Home/axiosConfig';

const AdminUpdatePaymentButton = ({ paymentId }) => {
  const [updatedPaymentMethod, setUpdatedPaymentMethod] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleUpdatePayment = async () => {
    try {
      // Validate token
      const token = localStorage.getItem('token');
      if (!token) {
        setErrorMessage('Token not found. Please log in.');
        return;
      }

      // Validate updated payment method
      if (!updatedPaymentMethod) {
        setErrorMessage('Please enter an updated payment method.');
        return;
      }

      // Make PUT request to update payment
      const response = await axios.put(`/payment/update_payments/${paymentId}`, { payment_method: updatedPaymentMethod }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Handle success
      if (response.status === 200) {
        setSuccessMessage('Payment updated successfully!');
        setErrorMessage('');
        // Optionally, you can reset the input field here:
        setUpdatedPaymentMethod('');
        alert('Payment updated successfully!')
      }
    } catch (error) {
      // Handle error
      console.error('Error updating payment:', error);
      setErrorMessage('Error updating payment. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div>
      <h2>Update Payment</h2>
      <div>
        <label>
          Updated Payment Method:
          <input
            type="text"
            value={updatedPaymentMethod}
            onChange={(e) => setUpdatedPaymentMethod(e.target.value)}
          />
        </label>
      </div>
      <div>
        <button onClick={handleUpdatePayment}>Update Payment</button>
      </div>
      {errorMessage && (
        <div style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</div>
      )}
      {successMessage && (
        <div style={{ color: 'green', marginTop: '10px' }}>{successMessage}</div>
      )}
    </div>
  );
};

export default AdminUpdatePaymentButton;
