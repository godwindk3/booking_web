// Them, sua, xoa, khach san
// Them sua, xoa, phong
// Lay dc nguoi dung cua khach san

import React, { useState, useEffect } from 'react';
import axios from './axiosConfig';
import './OwnerDashboard.css';
import RoomList from './RoomList';
import ImageAccommodation from './ImageAccommodation';
import ImageUploadButton from './ImageUploadButton';
import AccommodationAmenity from './AcommodationAmenity';

const OwnerDashboard = () => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    info: '',
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

        setFormData({ name: '', location: '', info: '' });
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
      const id = accommodation.id;
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
        setFormData({ name: '', location: '', info: '' });
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
      info: accommodation.info,
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
        <div className="center-card create-hotel-card">
          <h2 className='h2-header'>Hãy đăng ký khách sạn của bạn</h2>
          {error && <p>{error}</p>}

          <form className='create-hotel-input-container' onSubmit={handleSubmit}>
            <label htmlFor="name"></label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Tên khách sạn"
            />
            <label htmlFor="location"></label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Địa điểm"
            />
            <label htmlFor="info"></label>
            <input
              type="text"
              id="info"
              name="info"
              value={formData.info}
              onChange={handleChange}
              placeholder='Thông tin thêm'
            />
            <button className='create-hotel-button' type="submit">Đăng ký khách sạn</button>
          </form>

        </div>
      ) 
      : 
      (
        <div>
          {/* <h2 className='h2-header'>Khách sạn của bạn</h2> */}

          {selectedAccommodation && (
            <div className="center-card create-hotel-card">
              <h2 className='h2-header'>Cập nhật khách sạn</h2>
              <form className='create-hotel-input-container' onSubmit={handleUpdate}>
                <label className='update-hotel-p' htmlFor="updateName">Tên khách sạn mới</label>
                <input
                  type="text"
                  id="updateName"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder='Tên khách sạn mới'
                />

                <label className='update-hotel-p' htmlFor="updateLocation">Địa điểm khách sạn mới</label>
                <input
                  type="text"
                  id="updateLocation"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder='Địa điểm khách sạn mới'
                />
                <label className='update-hotel-p' htmlFor="updateInfo">Thông tin thêm</label>
                <input
                  type="text"
                  id="updateInfo"
                  name="info"
                  value={formData.info}
                  onChange={handleChange}
                  placeholder='Thông tin thêm'
                />

                <button className='create-hotel-button' type="submit">Cập nhật khách sạn</button>
              </form>
            </div>
          )}

          {accommodationData.map((accommodation) => (
            <div key={accommodation.id}>
              <h2 className='h2-view-hotel-header'>Khách sạn của bạn</h2>
              <hr className='view-hotel-hr'/>
              {/* <ImageUploadButton accommodationId={accommodation.id} /> */}
              <div className="your-hotel-container">

                <div className='hotel-header-section'>
                  <div className='hotel-header-title-section'>
                    <h4 className='hotel-header-title-section-h4'>
                      <div className='flex gap-32'>
                        <div className='flex flex-col gap-16 flex-grow'>
                          <h4 className='hotel-header-title-section-h4'>{accommodation.name}</h4>
                          <div className='hotel-location-p'>Địa điểm: {accommodation.location}</div>
                        </div>
                      </div>
                    </h4>
                  </div>
                </div>

                <div className='hotel-location-p'>{accommodation.info}</div>
                {/* <ImageAccommodation accommodationId={accommodation.id} />
                <RoomList accommodationId={accommodation.id} /> */}
              </div>

              <div className="update-button-container">
                <button className='update-hotel-button' onClick={() => handleSelectAccommodation(accommodation)}>Cập nhật khách sạn </button>
                <button className='update-hotel-button' onClick={() => { handleDelete(accommodation) }}>Xóa khách sạn</button>
              </div>

              <hr className='view-hotel-hr'/>
              <div>
                <ImageAccommodation accommodationId={accommodation.id} />
                <ImageUploadButton accommodationId={accommodation.id} />
              </div>
              <>
                <AccommodationAmenity accommodationId={accommodation.id} />
                
              </>

              <hr className='view-hotel-hr'/>
              <div>
                <RoomList accommodationId={accommodation.id} />
              </div>
            </div>
          ))}

        </div>

      )}
    </div>
  );
};

export default OwnerDashboard;

