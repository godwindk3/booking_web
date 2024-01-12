import React, { useState, useEffect } from 'react';
import axios from '../Home/axiosConfig';
import AdminDeletePaymentButton from './AdminDeletePaymentButton';
import AdminCreatePayment from './AdminCreatePayment';
import AdminUpdatePaymentButton from './AdminUpdatePaymentButton';

import './AdminPayment.css';

const AdminPayment = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await axios.get('/payment/get_payments');
                setPayments(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching payments:', error);
                setError('Error fetching payments. Please try again.');
                setLoading(false);
            }
        };

        fetchPayments();
    }, []);

    return (
        <div>
            <AdminCreatePayment />

            <hr className='admin-payment-hr'></hr>

            <h2 className='h2-header'>Danh sách phương thức thanh toán</h2>
            {loading && <p>Loading payments...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div className='your-hotel-amenity-list'>
                {!loading && !error && (
                    <ul className='your-hotel-amenity-list-ul'>
                        {payments.map((payment) => (
                            <li className='your-hotel-amenity-list-li' key={payment.id}>{payment.payment_method}
                                {/* <p>ID: {payment.id}</p> */}
                                <div className="your-hotel-amenity-item">
                                    <AdminDeletePaymentButton paymentId={payment.id} />
                                </div>
                                {/* <AdminUpdatePaymentButton paymentId={payment.id} /> */}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default AdminPayment;
