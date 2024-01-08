// Them, sua, xoa, khach san
// Them sua, xoa, phong
// Lay dc nguoi dung cua khach san

import React, { useState, useEffect } from 'react';
import axios from './axiosConfig';
import './OwnerDashboard.css';

const OwnerDashboard = () => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
  });
  const [error, setError] = useState(null);
  const [accommodationData, setAccommodationData] = useState([]);
  const [selectedAccommodation, setSelectedAccommodation] = useState(null);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');

      const response = await axios.post('/accommodation/', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        console.log('Accommodation created successfully');
        // Additional logic after successful creation

        // Fetch the updated accommodation data
        fetchData();
      } else {
        console.error('Accommodation creation failed');
        // Additional logic after failed creation
      }
    } catch (error) {
      console.error('Error during accommodation creation:', error.message);

      if (error.response && error.response.status === 400) {
        setError('Validation error. Please check your input.');
      } else {
        setError('Error during accommodation creation. Please try again.');
      }
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const { id } = selectedAccommodation;

      const response = await axios.put(`/accommodation/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        console.log('Accommodation updated successfully');
        // Additional logic after successful update

        // Fetch the updated accommodation data
        fetchData();

        // Clear the form data and selected accommodation after successful update

        setFormData({ name: '', location: '' });
        setSelectedAccommodation(null);
      } else {
        console.error('Accommodation update failed');
        // Additional logic after failed update
      }
    } catch (error) {
      console.error('Error during accommodation update:', error.message);

      if (error.response && error.response.status === 400) {
        setError('Validation error. Please check your input.');
      } else {
        setError('Error during accommodation update. Please try again.');
      }
    }
  };

  const handleDelete = async (accommodation) => {
    try {
      const token = localStorage.getItem('token');
      const  id  = accommodation.id;
      const response = await axios.delete(`/accommodation/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        console.log('Accommodation deleted successfully');
        // Additional logic after successful delete
        // Fetch the updated accommodation data
        fetchData();

        // Clear the form data and selected accommodation after successful delete
        setFormData({ name: '', location: '' });
        setSelectedAccommodation(null);
      } else {
        console.error('Accommodation delete failed');
        // Additional logic after failed delete
      }
    } catch (error) {
      console.error('Error during accommodation delete:', error.message);
    }
  };



  const handleSelectAccommodation = (accommodation) => {
    setSelectedAccommodation(accommodation);
    setFormData({
      name: accommodation.name,
      location: accommodation.location,
    });
  };

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/user/get_managed_accommodation', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      // Assuming the server returns an empty array for a 404 response
      if (response.status === 404) {
        // Handle the case where no managed accommodations are found
        console.log('No managed accommodations found for the user');
        setAccommodationData([]); // Set an empty array or handle it based on your requirements
      } else {
        // Handle the case where data is successfully fetched
        setAccommodationData(response.data);
      }
  
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // Handle the 404 error here
        console.log('No managed accommodations found for the user');
        setAccommodationData([]); // Set an empty array or handle it based on your requirements
      } else {
        // Handle other errors
        console.error('Error fetching accommodation data:', error.message);
      }
    }
  };
  

  useEffect(() => {
    fetchData();
  }, []); // Run only once when the component mounts

  return (
    <div>
      {accommodationData.length === 0 ? (
        <div>
          <h2>Hãy đăng ký khách sạn của bạn</h2>
          {error && <p>{error}</p>}
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <label htmlFor="location">Location:</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
            <button type="submit">Đăng ký khách sạn</button>
          </form>
        </div>
      ) : (
        <div>
          <p>Khách sạn của bạn</p>
          {accommodationData.map((accommodation) => (
            <div key={accommodation.id} className="accommodation-container">
              <div className="accommodation-info">
                <p>Name: {accommodation.name}</p>
                <p>Location: {accommodation.location}</p>
              </div>
              <div className="button-container">
                <button onClick={() => handleSelectAccommodation(accommodation)}>Update</button>
                <button onClick={() => {  handleDelete(accommodation) }}>Delete</button>
              </div>
            </div>
          ))}

          {selectedAccommodation && (
            <div>
              <h3>Update Accommodation</h3>
              <form onSubmit={handleUpdate}>
                <label htmlFor="updateName">New Name:</label>
                <input
                  type="text"
                  id="updateName"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />

                <label htmlFor="updateLocation">New Location:</label>
                <input
                  type="text"
                  id="updateLocation"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                />

                <button type="submit">Update Accommodation</button>
              </form>
            </div>
          )}
        </div>

      )}
    </div>
  );
};

export default OwnerDashboard;

