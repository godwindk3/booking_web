import React, { useState, useEffect } from 'react';
import axios from './axiosConfig';

import './RoomAmenityButton.css'

const RoomAmenityButton = ({ roomId }) => {
  const [amenities, setAmenities] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAmenities = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/amenity/get_all_room_amenities`);
        setAmenities(response.data);
      } catch (error) {
        console.error('Error fetching accommodation amenities:', error.message);
      } finally {
        setLoading(false);
      }
    };

    if (showPopup && roomId) {
      fetchAmenities();
    }
  }, [roomId, showPopup]);

  const handleAttach = async (amenityId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        '/amenity/room/attach',
        {
          roomID: roomId,
          room_amenityID: amenityId,
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

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div>
      <button className='all-room-amenities-button' onClick={togglePopup}>Tất cả tiện ích phòng</button>

      {showPopup && (
        <div>
          {/* <h3>All Room Amenities:</h3> */}
          <p>Nhấn vào tiện ích để thêm vào phòng</p>

          {loading && <p>Loading amenities...</p>}
          {!loading && amenities.length === 0 && <p>Không có tiện ích phòng</p>}

          <div className='acco-amenity-list'>
            {!loading && amenities.length > 0 && (
              // <ul>
              //   {amenities.map((amenity) => (
              //     <li key={amenity.id}>
              //       {amenity.name}
              //       <button onClick={() => handleAttach(amenity.id)}>Attach</button>
              //     </li>
              //   ))}
              // </ul>

              <ul className='acco-amenity-list-ul'>
                {amenities.map((amenity) => (
                  <li className='acco-amenity-list-li' key={amenity.id}>
                    <div className="amenity-item">
                      <button className='acco-amenity-list-button' onClick={() => handleAttach(amenity.id)}>{amenity.name}</button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {/* <button onClick={() => setShowPopup(false)}>Close</button> */}
        </div>
      )}
    </div>
  );
};

export default RoomAmenityButton;
