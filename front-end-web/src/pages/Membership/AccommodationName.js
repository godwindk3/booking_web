import React, { useEffect, useState } from 'react';
import axios from '../Home/axiosConfig';

const AccommodationName = ({ accommodationId }) => {
  const [accommodation, setAccommodation] = useState(null);

  useEffect(() => {
    const fetchAccommodationData = async () => {
      try {
        const response = await axios.get(`/accommodation/${accommodationId}`);
        setAccommodation(response.data);
      } catch (error) {
        console.error('Error fetching accommodation data:', error);
        // Handle error
      }
    };

    fetchAccommodationData();
  }, [accommodationId]);

  if (!accommodation) {
    return <div>Loading...</div>; // You can render a loading indicator or handle it differently
  }

  return (
    <div>
      <h4>{accommodation.name}</h4>
    </div>
  );
};

export default AccommodationName;
