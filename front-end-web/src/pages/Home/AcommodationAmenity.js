import React, { useState, useEffect } from 'react';
import axios from './axiosConfig';
import AccommodationAmenityButton from './AccommodationAmenityButton';
import AccommodationDetachButton from './AccommodationDetachButton';
import './AccommodationAmenity.css'

const AccommodationAmenity = ({ accommodationId }) => {
  const [amenities, setAmenities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAmenities = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/amenity/get_accommodation_amenities/${accommodationId}`);
        setAmenities(response.data);
      } catch (error) {
        console.error('Error fetching accommodation amenities:', error.message);
      } finally {
        setLoading(false);
      }
    };

    if (accommodationId) {
      fetchAmenities();
    }
  }, [accommodationId]);

  return (
    <div>
      <div className='your-hotel-amenity-card'>
        <h2 className='h2-view-amenity-header'>Các tiện ích hiện tại của khách sạn</h2>
        <p>Nhấn vào nút x để xoá tiện ích tương ứng</p>

        {loading && <p>Loading amenities...</p>}
        {!loading && amenities.length === 0 && <p>Khách sạn của bạn chưa có tiện ích nào</p>}

        <div className='your-hotel-amenity-list'>
          {!loading && amenities.length > 0 && (
            <ul className='your-hotel-amenity-list-ul'>
              {amenities.map((amenity) => (
                <li className='your-hotel-amenity-list-li' key={amenity.id}>{amenity.name}
                  <div className="your-hotel-amenity-item">
                    <AccommodationDetachButton accommodationId={accommodationId} amenityId={amenity.id} />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>
      <>
        <AccommodationAmenityButton accommodationId={accommodationId}/>
      </>
    </div>
  );
};

export default AccommodationAmenity;
