import React, { useState, useEffect } from 'react';
import axios from '../Home/axiosConfig';
import AdminDeletePaymentButton from './AdminDeletePaymentButton';
import AdminCreatePayment from './AdminCreatePayment';
import AdminUpdatePaymentButton from './AdminUpdatePaymentButton';
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
            <h2>Payments List</h2>
            {loading && <p>Loading payments...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {!loading && !error && (
                <ul>
                    {payments.map((payment) => (
                        <li key={payment.id}>
                            <p>ID: {payment.id}</p>
                            <p>Payment Method: {payment.payment_method}</p>
                            <AdminDeletePaymentButton paymentId={payment.id} />
                            {/* <AdminUpdatePaymentButton paymentId={payment.id} /> */}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AdminPayment;
