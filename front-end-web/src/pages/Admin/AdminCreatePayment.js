import React, { useState } from 'react';
import axios from '../Home/axiosConfig';

import './AdminCreatePayment.css'

const AdminCreatePayment = () => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleCreatePayment = async () => {
    try {
      // Validate token
      const token = localStorage.getItem('token');
      if (!token) {
        setErrorMessage('Token not found. Please log in.');
        return;
      }

      // Validate payment method
      if (!paymentMethod) {
        setErrorMessage('Please enter a payment method.');
        return;
      }

      // Make POST request to create payment
      const response = await axios.post('/payment/create_payment', { payment_method: paymentMethod }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Handle success
      if (response.status === 201) {
        setSuccessMessage('Payment created successfully!');
        setErrorMessage('');
        // Optionally, you can reset the input field here:
        setPaymentMethod('');
        alert('Payment created successfully!')
      }
    } catch (error) {
      // Handle error
      console.error('Error creating payment:', error);
      setErrorMessage('Error creating payment. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div>
      <h2 className='h2-header'>Tạo phương thức thanh toán</h2>
      {/* <div>
        <label className='update-hotel-p'>
          Payment Method:
          <input
            type="text"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
        </label>
      </div> */}

      <form className='admin-create-payment-input-container'>
        <label className='admin-create-payment-p'>Phương thức thanh toán</label>

        <div className='admin-create-paymentmethod-input-and-button'>
          <input 
            type="text"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />

          <button onClick={handleCreatePayment}>Tạo phương thức</button>
        </div>
      </form>

      {errorMessage && (
        <div style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</div>
      )}
      {successMessage && (
        <div style={{ color: 'green', marginTop: '10px' }}>{successMessage}</div>
      )}

    </div>
  );
};

export default AdminCreatePayment;
