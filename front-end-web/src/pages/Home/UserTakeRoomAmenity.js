import React, { useEffect, useState } from 'react';
import axios from './axiosConfig';

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
      {loading && <p>Loading room amenities...</p>}
      {!loading && roomAmenities.length === 0 && <p>Phòng không có tiện ích</p>}
      {!loading && roomAmenities.length > 0 && (
        <div>
          <h2>Tiện ích phòng</h2>
          <ul>
            {roomAmenities.map((amenity) => (
              <li key={amenity.id}>
                <p>{amenity.name}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserTakeRoomAmenity;
