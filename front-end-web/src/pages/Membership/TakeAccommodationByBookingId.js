import React, { useState, useEffect } from 'react';
import axios from '../Home/axiosConfig';

const TakeAccommodationByBookingId = ({ bookingId }) => {
  const [accommodationId, setAccommodationId] = useState(null);
  const [accommodationDetails, setAccommodationDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        // Send GET request to fetch booking details
        const response = await axios.get(`/booking/${bookingId}`);
        // Update state with the received accommodationID
        setAccommodationId(response.data.accommodationID);
      } catch (error) {
        console.error('Error fetching booking details:', error);
        setError('Error fetching booking details. Please try again.');
      }
    };

    // Fetch booking details when the component mounts
    fetchBookingDetails();
  }, [bookingId]);

  useEffect(() => {
    const fetchAccommodationDetails = async () => {
      if (accommodationId) {
        try {
          // Send GET request to fetch accommodation details
          const response = await axios.get(`/accommodation/${accommodationId}`);
          // Update state with the received accommodation details
          setAccommodationDetails(response.data);
        } catch (error) {
          console.error('Error fetching accommodation details:', error);
          setError('Error fetching accommodation details. Please try again.');
        }
      }
    };

    // Fetch accommodation details when accommodationId changes
    fetchAccommodationDetails();
  }, [accommodationId]);

  return (
    <div>
      {/* <h2>Khách sạn bạn đã review</h2> */}
      {error && <p>{error}</p>}
      {accommodationDetails && (
        <>
          <p>Name: {accommodationDetails.name}</p>
          {/* Display other details as needed */}
        </>
      )}
    </div>
  );
};

export default TakeAccommodationByBookingId;
