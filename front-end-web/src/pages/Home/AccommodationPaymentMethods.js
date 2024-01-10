import React, { useState, useEffect } from 'react';
import axios from './axiosConfig';
import PaymentButton from './PaymentButton';
import PaymentDetachButton from './PaymentDetachButton';
import './AccommodationPaymentMethods.css'

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
      <div className='your-hotel-payment-method-card'>
        <h2 className='h2-view-payment-methods-header'>Các phương thức thanh toán hiện tại của khách sạn</h2>
        <p>Nhấn vào nút x để xoá phương thức thanh toán tương ứng</p>

        {loading && <p>Loading payment methods...</p>}
        {!loading && paymentMethods.length === 0 && <p>Khách sạn của bạn chưa có phương thức thanh toán nào</p>}

        <div className='your-hotel-payment-methods-list'>
          {!loading && paymentMethods.length > 0 && (
            <ul className='your-hotel-payment-methods-list-ul'>
              {paymentMethods.map((paymentMethod) => (
                <li className='your-hotel-payment-methods-list-li' key={paymentMethod.id}>{paymentMethod.payment_method}

                <div className="your-hotel-payment-methods-item">
                  <PaymentDetachButton accommodationId={accommodationId} paymentId={paymentMethod.id} />
                </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <>
        <PaymentButton accommodationId={accommodationId}/>
      </>
    </div>
  );
};

export default AccommodationPaymentMethods;
