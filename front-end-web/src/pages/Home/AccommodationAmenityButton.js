import React, { useState, useEffect } from 'react';
import axios from './axiosConfig';

const AccommodationAmenityButton = ({ accommodationId }) => {
  const [amenities, setAmenities] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAmenities = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/amenity/get_all_accommodation_amenities`);
        setAmenities(response.data);
      } catch (error) {
        console.error('Error fetching accommodation amenities:', error.message);
      } finally {
        setLoading(false);
      }
    };

    if (showPopup && accommodationId) {
      fetchAmenities();
    }
  }, [accommodationId, showPopup]);

  const handleAttach = async (amenityId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        '/amenity/accommodation/attach',
        {
          accommodationID: accommodationId,
          amenityID: amenityId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 201) {
        console.log('Amenity attached successfully');
        alert('Amenity attached successfully')
        // Additional logic after successful attachment
        // You may want to update the UI or perform other actions
      } else {
        console.error('Amenity attachment failed');
        
        // Additional logic after failed attachment
      }
    } catch (error) {
      console.error('Error during amenity attachment:', error.message);
    }
  };

  return (
    <div>
      <button onClick={() => setShowPopup(true)}>Show Amenities</button>

      {showPopup && (
        <div>
          <h3>Accommodation Amenities:</h3>
          {loading && <p>Loading amenities...</p>}
          {!loading && amenities.length === 0 && <p>No amenities available for this accommodation.</p>}
          {!loading && amenities.length > 0 && (
            <ul>
              {amenities.map((amenity) => (
                <li key={amenity.id}>
                  {amenity.name}
                  <button onClick={() => handleAttach(amenity.id)}>Attach</button>
                </li>
              ))}
            </ul>
          )}
          <button onClick={() => setShowPopup(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default AccommodationAmenityButton;
