import React, { useEffect, useState } from 'react';
import axios from './axiosConfig';

import './UserTakeAmenity.css';

const UserTakeAmenity = ({ accommodationId }) => {
  const [amenities, setAmenities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccommodationAmenities = async () => {
      try {
        const response = await axios.get(`/amenity/get_accommodation_amenities/${accommodationId}`);
        setAmenities(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching accommodation amenities:', error);
        // Handle error
        setLoading(false);
      }
    };

    fetchAccommodationAmenities();
  }, [accommodationId]);

  return (
    <div>
      {loading && <p>Loading amenities...</p>}
      {!loading && amenities.length === 0 && <p>No amenities available.</p>}
      {!loading && amenities.length > 0 && (
        <div>
          {/* <h2>Tiện ích khách sạn</h2> */}
          <div className='user-acco-amenity-list-ul'>
            {amenities.map((amenity) => (
              <li className='user-acco-amenity-list-li' key={amenity.id}>
                {/* {amenity.name} */}
                <button className='user-acco-amenity-list-button'>{amenity.name}</button>
              </li>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTakeAmenity;
