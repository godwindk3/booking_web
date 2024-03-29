import React, { useEffect, useState } from 'react';
import axios from './axiosConfig';

import './UserTakeRoomAmenity.css'

const UserTakeRoomAmenity = ({ roomId }) => {
  const [roomAmenities, setRoomAmenities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoomAmenities = async () => {
      try {
        const response = await axios.get(`/amenity/get_room_amenities/${roomId}`);
        setRoomAmenities(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching room amenities:', error);
        // Handle error
        setLoading(false);
      }
    };

    fetchRoomAmenities();
  }, [roomId]);

  return (
    <div>
      {/* <hr className='user-view-room-info-hr'/> */}
      {loading && <p>Loading room amenities...</p>}
      {!loading && roomAmenities.length === 0 && <p>Phòng không có tiện ích</p>}
      {!loading && roomAmenities.length > 0 && (
        <div>
          <h2 className='your-booked-hotel-header-vcl-xin-m-day-csss-cssss'>Tiện ích phòng</h2>

          <div className='user-roomdetailsbutton2-amenities-list user-acco-amenity-list-ul-add'>
          <ul className='user-acco-amenity-list-ul'>
            {roomAmenities.map((amenity) => (
              <li className='user-acco-amenity-list-li' key={amenity.id}>
                <button className='user-acco-amenity-list-button'>{amenity.name}</button>
              </li>
            ))}
          </ul>
          </div>

        </div>
      )}
    </div>
  );
};

export default UserTakeRoomAmenity;
