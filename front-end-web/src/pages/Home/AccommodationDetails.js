import React, { useEffect, useState } from 'react';
import axios from './axiosConfig';
import { useParams } from 'react-router-dom';
import UserTakeAmenity from './UserTakeAmenity';
import UserTakePayment from './UserTakePayment';
import UserTakeAccommodationImages from './UserTakeAccommodationImages';
import UserTakeRooms from './UserTakeRooms';
import RoomAvailabilityButton from './RoomAvailabilityButton';
import AccommodationReview from './AccommodationReview';

const AccommodationDetails = () => {
  const { accommodationId } = useParams();
  const [accommodation, setAccommodation] = useState(null);

  useEffect(() => {
    const fetchAccommodationDetails = async () => {
      try {
        const response = await axios.get(`/accommodation/${accommodationId}`);
        setAccommodation(response.data);
      } catch (error) {
        console.error('Error fetching accommodation details:', error);
        // Handle error
      }
    };

    fetchAccommodationDetails();
  }, [accommodationId]);

  if (!accommodation) {
    return <div>Loading...</div>;
  }

  return (
    <div className={accommodation.id}>
      <h2>{accommodation.name}</h2>
      <p>Location: {accommodation.location}</p>
      <p>Info: {accommodation.info}</p>
      {/* Render other details as needed */}
      <UserTakeAccommodationImages accommodationId={accommodation.id}/>
      <UserTakeAmenity accommodationId={accommodation.id}/>
      <UserTakePayment accommodationId={accommodation.id}/>
      <RoomAvailabilityButton accommodationId={accommodation.id}/>
      <UserTakeRooms accommodationId={accommodation.id}/>
      <AccommodationReview accommodationId={accommodation.id}/>
      
    </div>
  );
};

export default AccommodationDetails;
