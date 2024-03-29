
// import React, { useState, useEffect } from 'react';
// import axios from './axiosConfig';

// const UserPaymentButton = ({ accommodationId, roomId }) => {
//   const [checkinDate, setCheckinDate] = useState('');
//   const [checkoutDate, setCheckoutDate] = useState('');
//   const [paymentMethods, setPaymentMethods] = useState([]);
//   const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
//   const [totalPrice, setTotalPrice] = useState(0);

//   useEffect(() => {
//     // Fetch payment methods when the component mounts
//     const fetchPaymentMethods = async () => {
//       try {
//         const response = await axios.get(`/accommodation/${accommodationId}/get_payment_methods`);
//         setPaymentMethods(response.data);
//       } catch (error) {
//         console.error('Error fetching payment methods:', error);
//         // Handle error
//       }
//     };

//     fetchPaymentMethods();
//   }, [accommodationId]);

//   const handleButtonClick = async () => {
//     try {
//       // Decode the token to get userID
//       const token = localStorage.getItem('token');
//       const decodedToken = decodeToken(token);

//       if (!decodedToken) {
//         // Handle the case where decoding fails
//         console.error('Token decoding failed');
//         return;
//       }

//       // Format the dates to "year-month-day" format
//       const formattedCheckinDate = new Date(checkinDate).toISOString().split('T')[0];
//       const formattedCheckoutDate = new Date(checkoutDate).toISOString().split('T')[0];

//       // Prepare the booking data
//       const bookingData = {
//         accommodationID: accommodationId,
//         checkin_date: formattedCheckinDate,
//         checkout_date: formattedCheckoutDate,
//         payment_method: selectedPaymentMethod,
//         roomID: roomId,
//         userID: decodedToken.userID, // Use the decoded userID directly
//       };
//       console.log(bookingData)

//       // Send a POST request to create a booking
//       const response = await axios.post('/booking/', bookingData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       // Handle the response, e.g., show a success message
//       console.log('Booking created successfully:', response.data);
//     } catch (error) {
//       console.error('Error creating booking:', error);

//       // Handle error
//     }
//   };

//   const decodeToken = (token) => {
//     try {
//       // Split the JWT into header, payload, and signature
//       const [header, payloadBase64, signature] = token.split('.');

//       // Decode the payload from Base64
//       const decodedPayload = JSON.parse(atob(payloadBase64));

//       // Check if the "userID" attribute exists in the payload
//       if (decodedPayload.userID) {
//         return decodedPayload;
//       } else {
//         console.error('Token does not contain userID');
//         return null;
//       }
//     } catch (error) {
//       console.error('Error decoding or processing the JWT:', error.message);
//       // Return null in case of an error
//       return null;
//     }
//   };

//   return (
//     <div>
//       <label>
//         Check-in Date:
//         <input
//           type="date"
//           value={checkinDate}
//           onChange={(e) => setCheckinDate(e.target.value)}
//         />
//       </label>
//       <label>
//         Check-out Date:
//         <input
//           type="date"
//           value={checkoutDate}
//           onChange={(e) => setCheckoutDate(e.target.value)}
//         />
//       </label>
//       <label>
//         Payment Method:
//         <select
//           value={selectedPaymentMethod}
//           onChange={(e) => setSelectedPaymentMethod(e.target.value)}
//         >
//           <option value="">Select Payment Method</option>
//           {paymentMethods.map((method) => (
//             <option key={method.id} value={method.id}>
//               {method.payment_method}
//             </option>
//           ))}
//         </select>
//       </label>
//       <button onClick={handleButtonClick}>Book Now</button>
//     </div>
//   );
// };

// export default UserPaymentButton;



import React, { useState, useEffect } from 'react';
import axios from './axiosConfig';

import './UserPaymentButton.css'

const UserPaymentButton = ({ accommodationId, roomId }) => {
    const [checkinDate, setCheckinDate] = useState('');
    const [checkoutDate, setCheckoutDate] = useState('');
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [showFailurePopup, setShowFailurePopup] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);

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

            // Format the dates to "year-month-day" format
            const formattedCheckinDate = new Date(checkinDate).toISOString().split('T')[0];
            const formattedCheckoutDate = new Date(checkoutDate).toISOString().split('T')[0];

            // Prepare the booking data
            const bookingData = {
                accommodationID: accommodationId,
                checkin_date: formattedCheckinDate,
                checkout_date: formattedCheckoutDate,
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

            <div className="user-booking-box">
                <div className='user-booking-components'>
                    <label>
                        Ngày Check-in:
                        <input
                            type="date"
                            value={checkinDate}
                            onChange={(e) => setCheckinDate(e.target.value)}
                        />
                    </label>
                </div>

                <div className='user-booking-components'>
                    <label>
                        Ngày Check-out:
                        <input
                            type="date"
                            value={checkoutDate}
                            onChange={(e) => setCheckoutDate(e.target.value)}
                        />
                    </label>
                </div>

                <div className='user-booking-components2'>
                    <label>
                        Phương thức thanh toán:
                        <select className="select-payment-method-button"
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

                <div className='user-booking-components'>
                    <button className='user-booking-popup-close-button' onClick={handleButtonClick}>Đặt phòng ngay</button>
                </div>
            </div>

            {showSuccessPopup && (
                <div className="popup">
                    <div className='dat-phong-khong-thanh-cong'>Đặt phòng thành công!</div>
                    <button className='user-booking-popup-close-button' onClick={() => setShowSuccessPopup(false)}>Đóng</button>
                </div>
            )}

            {showFailurePopup && (
                <div className="popup">
                    <div className='dat-phong-khong-thanh-cong'>Đặt phòng không thành công!</div>
                    <ul>
                        <li>Hãy chắc chắn rằng bạn đã chọn một trong các phương thức thanh toán</li>
                        <li>Hãy chắc chắn rằng ngày check-in và check-out là hợp lệ</li>
                        {/* Add more specific checks based on your requirements */}
                    </ul>
                    <div className='dat-phong-khong-thanh-cong2'>Hãy kiểm tra và thử lại!</div>
                    <button className='user-booking-popup-close-button' onClick={() => setShowFailurePopup(false)}>Đóng</button>
                </div>
            )}

        </div>
    );
};

export default UserPaymentButton;
