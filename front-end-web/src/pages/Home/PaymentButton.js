import React, { useState, useEffect } from 'react';
import axios from './axiosConfig';
import './PaymentButton.css'

const PaymentButton = ({ accommodationId }) => {
  const [payments, setPayments] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/payment/get_payments');
        setPayments(response.data);
      } catch (error) {
        console.error('Error fetching payments:', error.message);
      } finally {
        setLoading(false);
      }
    };

    if (showPopup) {
      fetchPayments();
    }
  }, [showPopup]);

  const handleAttach = async (paymentId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `/accommodation/${accommodationId}/add_payment_method/${paymentId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Payment method attached successfully');
      // Additional logic after successful attachment
      // You may want to update the UI or perform other actions
    } catch (error) {
      console.error('Error during payment attachment:', error.message);
    }
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div>
      {/* <button onClick={() => setShowPopup(true)}>Toàn bộ các phương thức thanh toán</button> */}
      <button className='all-payment-methods-button' onClick={togglePopup}>Toàn bộ các phương thức thanh toán</button>

      {showPopup && (
        <div className="add-payment-method-card">
          <h2 className='h2-payment-methods-header'>Các phương thức thanh toán được hỗ trợ</h2>
          <p>Nhấn vào phương thức thanh toán để thêm vào khách sạn của bạn</p>

          {loading && <p>Loading payments...</p>}
          {!loading && payments.length === 0 && <p>No payments available.</p>}

          <div className='acco-payment-methods-list'>
            {!loading && payments.length > 0 && (
              // <ul>
              //   {payments.map((payment) => (
              //     <li key={payment.id}>
              //       {payment.payment_method}
              //       <button onClick={() => handleAttach(payment.id)}>Thêm phương thức này</button>
              //     </li>
              //   ))}
              // </ul>

              <ul className='acco-payment-methods-list-ul'>
                {payments.map((payment) => (
                  <li className='acco-payment-methods-list-li' key={payment.id}>
                    <div className="payment-methods-item">
                      <button className='acco-payment-methods-list-button' onClick={() => handleAttach(payment.id)}>{payment.payment_method}</button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {/* <button onClick={() => setShowPopup(false)}>Close</button> */}
        </div>
      )}
    </div>
  );
};

export default PaymentButton;
