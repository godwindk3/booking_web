import React, { useEffect, useState } from 'react';
import axios from '../Home/axiosConfig';
import { Link } from 'react-router-dom';
import AccommodationName from './AccommodationName';
import RoomDetailsButton from './RoomDetailsButton';
import MembershipPayment from './MembershipPayment';

const MembershipClassPage = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);

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

  return (
    <div>
      <h2>Your Bookings</h2>
      {error && <p>{error}</p>}
      <ul>
        {bookings.map((booking) => (
          <li key={booking.id}>
            <AccommodationName accommodationId={booking.accommodationID} />
            <Link to={`/getaccommodation/${booking.accommodationID}`}>Thông tin chi tiết khách sạn</Link>,{' '}
            {/* Add name here */}
            <strong>Ngày check-in</strong> {booking.checkin_date},{' '}
            <strong>Ngày check-out</strong> {booking.checkout_date},{' '}
            <strong>Chi phí</strong> {booking.total_price + 'VND'}{' '}

            <MembershipPayment paymentId={booking.payment_method}/>
            <RoomDetailsButton roomId={booking.roomID} />
            
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MembershipClassPage;
