import React, { useState, useEffect } from 'react';
import axios from '../Home/axiosConfig';
import AdminRoomAmenityCreate from './AdminRoomAmenityCreate';
import AdminRoomAmenityDeleteButton from './AdminRoomAmenityDeleteButton';


const AdminRoomAmenity = () => {
  const [roomAmenities, setRoomAmenities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRoomAmenities = async () => {
      try {
        const response = await axios.get('/amenity/get_all_room_amenities');
        setRoomAmenities(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching room amenities:', error);
        setError('Error fetching room amenities. Please try again.');
        setLoading(false);
      }
    };

    fetchRoomAmenities();
  }, []);

  return (
    <div>
        <AdminRoomAmenityCreate/>
      <h2>Room Amenities List</h2>
      {loading && <p>Loading room amenities...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && (
        <ul>
          {roomAmenities.map((amenity) => (
            <li key={amenity.id}>
              <p>ID: {amenity.id}</p>
              <p>Name: {amenity.name}</p>
              <AdminRoomAmenityDeleteButton amenityId={amenity.id}/>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminRoomAmenity;
