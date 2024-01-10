import React, { useState, useEffect } from 'react';
import axios from './axiosConfig';
import AccommodationAmenityButton from './AccommodationAmenityButton';
import AccommodationDetachButton from './AccommodationDetachButton';

const AccommodationAmenity = ({ accommodationId }) => {
  const [amenities, setAmenities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAmenities = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/amenity/get_accommodation_amenities/${accommodationId}`);
        setAmenities(response.data);
      } catch (error) {
        console.error('Error fetching accommodation amenities:', error.message);
      } finally {
        setLoading(false);
      }
    };

    if (accommodationId) {
      fetchAmenities();
    }
  }, [accommodationId]);

  return (
    <div>
      <h3>Các tiện ích hiện tại của khách sạn</h3>
      {loading && <p>Loading amenities...</p>}
      {!loading && amenities.length === 0 && <p>No amenities available for this accommodation.</p>}
      {!loading && amenities.length > 0 && (
        <ul>
          {amenities.map((amenity) => (
            <li key={amenity.id}>{amenity.name}
            <>
            <AccommodationDetachButton accommodationId={accommodationId} amenityId={amenity.id} />
            </>
            </li>
          ))}
        </ul>
      )}
      <>
      <AccommodationAmenityButton accommodationId={accommodationId}/>
      </>
    </div>
  );
};

export default AccommodationAmenity;
