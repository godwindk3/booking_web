import React, { useState, useEffect } from 'react';
import axios from './axiosConfig';

import './UserPaymentButton2.css';

const UserPaymentButton2 = ({ accommodationId, roomId, checkinDate, checkoutDate }) => {
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [showFailurePopup, setShowFailurePopup] = useState(false);

    useEffect(() => {
        // Fetch payment methods when the component mounts
        const fetchPaymentMethods = async () => {
            try {
                const response = await axios.get(`/accommodation/${accommodationId}/get_payment_methods`);
                setPaymentMethods(response.data);
            } catch (error) {
                console.error('Error fetching payment methods:', error);
                // Handle error
            }
        };

        fetchPaymentMethods();
    }, [accommodationId]);

    const handleButtonClick = async () => {
        try {
            // Decode the token to get userID
            const token = localStorage.getItem('token');
            const decodedToken = decodeToken(token);

            if (!decodedToken) {
                // Handle the case where decoding fails
                console.error('Token decoding failed');
                return;
            }

            // Prepare the booking data
            const bookingData = {
                accommodationID: accommodationId,
                checkin_date: checkinDate,
                checkout_date: checkoutDate,
                payment_method: selectedPaymentMethod,
                roomID: roomId,
                userID: decodedToken.userID, // Use the decoded userID directly
            };

            // Send a POST request to create a booking
            const response = await axios.post('/booking/', bookingData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Handle the response
            console.log('Booking created successfully:', response.data);
            setShowSuccessPopup(true);
        } catch (error) {
            console.error('Error creating booking:', error);
            setShowFailurePopup(true);
            // Handle error
        }
    };

    const decodeToken = (token) => {
        try {
            // Split the JWT into header, payload, and signature
            const [header, payloadBase64, signature] = token.split('.');

            // Decode the payload from Base64
            const decodedPayload = JSON.parse(atob(payloadBase64));

            // Check if the "userID" attribute exists in the payload
            if (decodedPayload.userID) {
                return decodedPayload;
            } else {
                console.error('Token does not contain userID');
                return null;
            }
        } catch (error) {
            console.error('Error decoding or processing the JWT:', error.message);
            // Return null in case of an error
            return null;
        }
    };

    return (
        <div>
            <h2 className='h2-dat-phong'>Đặt phòng</h2>
            <br/>

            <div className="userpaymentbutton2-booking-box">
                <div className='userpaymentbutton2-booking-components2'>
                    {/* <label className=''>
                        <div>Phương thức thanh toán:</div>
                        <select className="select-payment-method-button"
                            value={selectedPaymentMethod}
                            onChange={(e) => setSelectedPaymentMethod(e.target.value)}>
                                
                                <option value="">Chọn phương thức thanh toán</option>
                                {paymentMethods.map((method) => (
                                    <option key={method.id} value={method.id}>
                                        {method.payment_method}
                                    </option>
                                ))}
                        </select>
                    </label> */}

                    <label className="userpaymentbutton2-label">
                    <div className="userpaymentbutton2-label-text">Phương thức thanh toán:</div>
                    <select
                        className="select-payment-method-button userpaymentbutton2-select-width"
                        value={selectedPaymentMethod}
                        onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                    >
                        <option value="">Chọn phương thức thanh toán</option>
                        {paymentMethods.map((method) => (
                        <option key={method.id} value={method.id}>
                            {method.payment_method}
                        </option>
                        ))}
                    </select>
                    </label>
                </div>

                <div className='userpaymentbutton2-booking-popup-close-button-container'>
                    <button className='userpaymentbutton2-booking-popup-close-button' onClick={handleButtonClick}>Đặt phòng ngay</button>
                </div>

            </div>

            {showSuccessPopup && (
                <div className="popup">
                    <div className='dat-phong-khong-thanh-cong'>Đặt phòng thành công</div>
                    <button className='user-booking-popup-close-button' onClick={() => setShowSuccessPopup(false)}>Đóng</button>
                </div>
            )}

            {showFailurePopup && (
                <div className="popup">
                    <div className='dat-phong-khong-thanh-cong'>Đặt phòng không thành công!</div>
                    <ul>
                        <li>Hãy chắc chắn rằng bạn đã chọn một trong các phương thức thanh toán</li>
                        {/* Add more specific checks based on your requirements */}
                    </ul>
                    <div className='dat-phong-khong-thanh-cong2'>Hãy kiểm tra và thử lại!</div>
                    <button className='user-booking-popup-close-button' onClick={() => setShowFailurePopup(false)}>Đóng</button>
                </div>
            )}

        </div>
    );
};

export default UserPaymentButton2;
