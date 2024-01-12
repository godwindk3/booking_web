import React, { useState, useEffect } from 'react';
import axios from './axiosConfig';
import './AccommodationAmenityButton.css'

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
        alert('Amenity attached fail')
        
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
      {/* <button className='all-amenities-button' onClick={() => setShowPopup(true)}>Toàn bộ các tiện ích</button> */}
      <button className='all-amenities-button' onClick={togglePopup}>Toàn bộ các tiện ích</button>
      
      {showPopup && (
        <div className="add-amenity-card">
          <h2 className='h2-amenities-header'>Các tiện ích được hỗ trợ</h2>
          <p>Nhấn vào tiện ích để thêm vào khách sạn của bạn</p>

          {loading && <p>Loading amenities...</p>}
          {!loading && amenities.length === 0 && <p>Không có tiện ích nào dành cho khách sạn của bạn</p>}

          <div className='acco-amenity-list'>
            {!loading && amenities.length > 0 && (
              // <ul>
              //   {amenities.map((amenity) => (
              //     <div key={amenity.id}>
              //       {amenity.name}
              //       <button onClick={() => handleAttach(amenity.id)}>Thêm tiện ích</button>
              //     </div>
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

          {/* <button className='acco-amenity-list-close-button' onClick={() => setShowPopup(false)}>Close</button> */}
        </div>
      )}
    </div>
  );
};

export default AccommodationAmenityButton;
