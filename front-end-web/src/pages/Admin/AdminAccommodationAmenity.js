import React, { useState, useEffect } from 'react';
import axios from '../Home/axiosConfig';
import AdminAccommodationAmenityCreate from './AdminAccommodationAmenityCreate';
import AdminAccommodationAmenityDeleteButton from './AdminAccommodationAmenityDeleteButton';
const AdminAccommodationAmenity = () => {
  const [accommodationAmenities, setAccommodationAmenities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAccommodationAmenities = async () => {
      try {
        const response = await axios.get('/amenity/get_all_accommodation_amenities');
        setAccommodationAmenities(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching accommodation amenities:', error);
        setError('Error fetching accommodation amenities. Please try again.');
        setLoading(false);
      }
    };

    fetchAccommodationAmenities();
  }, []);

  return (
    <div>
      <AdminAccommodationAmenityCreate/>
      <hr className='admin-payment-hr'></hr>
      <h2 className='h2-header'>Danh sách tiện ích khách sạn</h2>

      {loading && <p>Loading accommodation amenities...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className='your-hotel-amenity-list'>
        {!loading && !error && (
          <ul className='your-hotel-amenity-list-ul'>
            {accommodationAmenities.map((amenity) => (
              <li className='your-hotel-amenity-list-li' key={amenity.id}>
                {/* <p>ID: {amenity.id}</p> */}
                {amenity.name}
                
                <div className="your-hotel-amenity-item">
                  <AdminAccommodationAmenityDeleteButton amenityId={amenity.id}/>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminAccommodationAmenity;
