import React, { useEffect, useState } from 'react';
import axios from './axiosConfig';

import './UserTakePayment.css'

const UserTakePayment = ({ accommodationId }) => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const response = await axios.get(`/accommodation/${accommodationId}/get_payment_methods`);
        setPaymentMethods(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching payment methods:', error);
        // Handle error
        setLoading(false);
      }
    };

    fetchPaymentMethods();
  }, [accommodationId]);

  return (
    <div>
      {loading && <p>Loading payment methods...</p>}
      {!loading && paymentMethods.length === 0 && <p>No payment methods available.</p>}
      {!loading && paymentMethods.length > 0 && (
        <div>
          {/* <h2>Các phương thức thanh toán được chấp nhận</h2> */}
          <div className='user-acco-amenity-list-ul'>
            {paymentMethods.map((paymentMethod) => (
              <li className='user-acco-amenity-list-li' key={paymentMethod.id}>
                {/* {paymentMethod.payment_method} */}
                <button className='user-acco-amenity-list-button'>{paymentMethod.payment_method}</button>
              </li>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTakePayment;
