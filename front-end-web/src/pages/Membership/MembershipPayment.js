import React, { useState, useEffect } from 'react';
import axios from '../Home/axiosConfig';

const MembershipPayment = ({ paymentId }) => {
  const [paymentData, setPaymentData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        // Send a GET request to the /payment/get_payments/{payment_id} API
        const response = await axios.get(`/payment/get_payments/${paymentId}`);

        // Set the payment data state with the response data
        setPaymentData(response.data);
      } catch (error) {
        console.error('Error fetching payment data:', error);
        // Set an error state if there is an issue with the API request
        setError('Error fetching payment data. Please try again.');
      }
    };

    // Fetch payment data when the component mounts
    fetchPaymentData();
  }, [paymentId]); // Dependency array ensures the effect runs when paymentId changes

  return (
    <div>
      {error ? (
        <p>{error}</p>
      ) : (
        <div>
          <p>
            <strong>Phương thức thanh toán</strong>
          </p>
          <p>
            <strong></strong> {paymentData.payment_method}
          </p>
        </div>
      )}
    </div>
  );
};

export default MembershipPayment;
