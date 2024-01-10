import React, { useState, useEffect } from 'react';
import axios from './axiosConfig';
import PaymentButton from './PaymentButton';
import PaymentDetachButton from './PaymentDetachButton';
const AccommodationPaymentMethods = ({ accommodationId }) => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/accommodation/${accommodationId}/get_payment_methods`);
        setPaymentMethods(response.data);
      } catch (error) {
        console.error('Error fetching payment methods:', error.message);
      } finally {
        setLoading(false);
      }
    };

    if (accommodationId) {
      fetchPaymentMethods();
    }
  }, [accommodationId]);

  return (
    <div>
      <h3>Các phương thức thanh toán hiện tại của khách sạn</h3>
      {loading && <p>Loading payment methods...</p>}
      {!loading && paymentMethods.length === 0 && <p>No payment methods available for this accommodation.</p>}
      {!loading && paymentMethods.length > 0 && (
        <ul>
          {paymentMethods.map((paymentMethod) => (
            <li key={paymentMethod.id}>{paymentMethod.payment_method}
            <PaymentDetachButton accommodationId={accommodationId} paymentId={paymentMethod.id} />
            </li>
          ))}
        </ul>
      )}
      <>
            <PaymentButton accommodationId={accommodationId}/>
      </>
    </div>
  );
};

export default AccommodationPaymentMethods;