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
      <h2>Accommodation Amenities List</h2>
      {loading && <p>Loading accommodation amenities...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && (
        <ul>
          {accommodationAmenities.map((amenity) => (
            <li key={amenity.id}>
              <p>ID: {amenity.id}</p>
              <p>Name: {amenity.name}</p>
              <AdminAccommodationAmenityDeleteButton amenityId={amenity.id}/>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminAccommodationAmenity;
