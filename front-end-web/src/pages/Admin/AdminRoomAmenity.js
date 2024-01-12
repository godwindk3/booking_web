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
      <hr className='admin-payment-hr'></hr>
      <h2 className='h2-header'>Danh sách tiện ích phòng</h2>

      {loading && <p>Loading room amenities...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className='your-hotel-amenity-list'>
        {!loading && !error && (
          <ul className='your-hotel-amenity-list-ul'>
            {roomAmenities.map((amenity) => (
              <li className='your-hotel-amenity-list-li' key={amenity.id}>
                {/* <p>ID: {amenity.id}</p> */}
                {amenity.name}

                <div className="your-hotel-amenity-item">
                  <AdminRoomAmenityDeleteButton amenityId={amenity.id}/>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminRoomAmenity;
