// import React, { useEffect, useState } from 'react';
// import axios from '../Home/axiosConfig';
// import { Link } from 'react-router-dom';
// import AccommodationName from './AccommodationName';
// import RoomDetailsButton from './RoomDetailsButton';
// import MembershipPayment from './MembershipPayment';
// import DeleteBookingButton from './DeleteBookingButton';

// const MembershipClassPage = () => {
//   const [bookings, setBookings] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Retrieve the token from local storage
//         const token = localStorage.getItem('token');

//         // If the token is not present, handle the error or redirect to login
//         if (!token) {
//           // Handle the case where the token is not present
//           setError('User not authenticated');
//           return;
//         }

//         // Send a GET request to the /booking/ API with token validation
//         const response = await axios.get('/booking/', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         // Set the bookings state with the data from the API
//         setBookings(response.data);
//       } catch (error) {
//         console.error('Error fetching booking data:', error);
//         setError('Error fetching booking data. Please try again.');
//       }
//     };

//     // Fetch data when the component mounts
//     fetchData();
//   }, []); // Empty dependency array to run the effect only once on mount

//   const handleBookingDelete = async (deletedBookingId) => {
//     console.log('Deleting booking with ID:', deletedBookingId);
//     // Filter out the deleted booking from the current bookings state
//     const updatedBookings = bookings.filter((booking) => booking.id !== deletedBookingId);

//     // Update the bookings state with the filtered array
//     setBookings(updatedBookings);
//   };

//   return (
//     <div>
//       <h2>Your Bookings</h2>
//       {error && <p>{error}</p>}
//       <ul>
//         {bookings.map((booking) => (
//           <li key={booking.id}>
//             <AccommodationName accommodationId={booking.accommodationID} />
//             <Link to={`/getaccommodation/${booking.accommodationID}`}>Thông tin chi tiết khách sạn</Link>,{' '}
//             {/* Add name here */}
//             <strong>Ngày check-in</strong> {booking.checkin_date},{' '}
//             <strong>Ngày check-out</strong> {booking.checkout_date},{' '}
//             <strong>Chi phí</strong> {booking.total_price + 'VND'}{' '}
//             <DeleteBookingButton
//               bookingId={booking.id}
//               onDeleteSuccess={() => handleBookingDelete(booking.id)}
//             />
//             <MembershipPayment paymentId={booking.payment_method} />
//             <RoomDetailsButton roomId={booking.roomID} />
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default MembershipClassPage;

import React, { useEffect, useState } from 'react';
import axios from '../Home/axiosConfig';
import { Link } from 'react-router-dom';
import AccommodationName from './AccommodationName';
import RoomDetailsButton from './RoomDetailsButton';
import MembershipPayment from './MembershipPayment';
import DeleteBookingButton from './DeleteBookingButton';
import CreateReview from './CreateReview';
import GetAllReviewOfUser from './GetAllReviewOfUser';
import UpdateUserInfo from './UpdateUserInfo';

import './MembershipClassPage.css'

const MembershipClassPage = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const [userID, setUserID] = useState(null); // New state to store the userID
  const [role, setRole] = useState(null)
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Retrieve the token from local storage
        const token = localStorage.getItem('token');

        // If the token is not present, handle the error or redirect to login
        if (!token) {
          // Handle the case where the token is not present
          setError('User not authenticated');
          return;
        }

        // Decode the token to get the userID using your function
        const decodedToken = decodeToken(token);

        if (!decodedToken) {
          // Handle the case where decoding fails
          setError('Error decoding token');
          return;
        }

        // Set the userID state
        setUserID(decodedToken.userID);
        setRole(decodedToken.role)

        // Send a GET request to the /booking/ API with token validation
        const response = await axios.get('/booking/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Set the bookings state with the data from the API
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching booking data:', error);
        setError('Error fetching booking data. Please try again.');
      }
    };

    // Fetch data when the component mounts
    fetchData();
  }, []); // Empty dependency array to run the effect only once on mount

  const handleBookingDelete = async (deletedBookingId) => {
    console.log('Deleting booking with ID:', deletedBookingId);
    // Filter out the deleted booking from the current bookings state
    const updatedBookings = bookings.filter((booking) => booking.id !== deletedBookingId);

    // Update the bookings state with the filtered array
    setBookings(updatedBookings);
  };
  const decodeToken = (token) => {
    try {
      // Split the JWT into header, payload, and signature
      const [header, payloadBase64, signature] = token.split('.');

      // Decode the payload from Base64
      const decodedPayload = JSON.parse(atob(payloadBase64));

      // Check if the "userID" attribute exists in the payload
      if (decodedPayload.userID || decodedPayload.role) {
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
      <div className="create-hotel-card">
        <h2 className='h2-header'>Cập nhật tài khoản</h2>
        <UpdateUserInfo role={role}/>
      </div>

      
      <h2 className='h2-header'>Phòng bạn đã đặt</h2>
        <div className="">
          {error && <p>{error}</p>}

          <div>
            {bookings.map((booking) => (
              <div className='your-booked-card' key={booking.id}>

                {/* <AccommodationName accommodationId={booking.accommodationID} /> */}
                <div className='your-booked-detail-container'>

                  <div>
                    <Link className='your-booked-card-hotel-name' to={`/getaccommodation/${booking.accommodationID}`}>
                      <AccommodationName accommodationId={booking.accommodationID} />
                    </Link>
                  </div>

                  <div className='your-booked-card-hotel-detail-div'>
                    
                    <div className='your-booked-checin-checkout-container'>
                      <div className='your-booked-checin-date'>
                        <strong>Ngày check-in: </strong> {booking.checkin_date}{' '}
                        <br/>
                      </div>
                      <div className='your-booked-checin-date'>
                        <strong>Ngày check-out: </strong> {booking.checkout_date}{' '}
                        <br/>
                      </div>
                      <div className='your-booked-checin-date'>
                        <strong>Chi phí:</strong> {booking.total_price + 'VND'}{' '}
                      </div>
                    </div>

                    <MembershipPayment paymentId={booking.payment_method} />

                    <DeleteBookingButton
                      bookingId={booking.id}
                      onDeleteSuccess={() => handleBookingDelete(booking.id)}
                    />
                    
                    <RoomDetailsButton roomId={booking.roomID} />
                  </div>

                  <CreateReview bookingId={booking.id} userId={userID}/>

                </div>

              </div>
            ))}
            <></>
          </div>

        </div>

      
      <h2 className='h2-header'>Review bạn đã đăng</h2>
      <div className="your-review-card">
        <GetAllReviewOfUser userId={userID}/>
      </div>
      
    </div>
  );
};




export default MembershipClassPage;
