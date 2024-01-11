import React, { useEffect, useState } from 'react';
import axios from './axiosConfig';
import { useParams } from 'react-router-dom';
import UserTakeAmenity from './UserTakeAmenity';
import UserTakePayment from './UserTakePayment';
import UserTakeAccommodationImages from './UserTakeAccommodationImages';
import UserTakeRooms from './UserTakeRooms';
import RoomAvailabilityButton from './RoomAvailabilityButton';
import AccommodationReview from './AccommodationReview';

import './AccommodationDetails.css';

const AccommodationDetails = () => {
  const { accommodationId } = useParams();
  const [accommodation, setAccommodation] = useState(null);

  useEffect(() => {
    const fetchAccommodationDetails = async () => {
      try {
        const response = await axios.get(`/accommodation/${accommodationId}`);
        setAccommodation(response.data);
      } catch (error) {
        console.error('Error fetching accommodation details:', error);
        // Handle error
      }
    };

    fetchAccommodationDetails();
  }, [accommodationId]);

  if (!accommodation) {
    return <div>Loading...</div>;
  }

  return (
    <div className={accommodation.id}>
      {/* <h2>{accommodation.name}</h2>
      <p>Location: {accommodation.location}</p>
      <p>Info: {accommodation.info}</p> */}

      <h2 className='h2-view-hotel-header'>Thông tin khách sạn</h2>
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
      </div>
      <UserTakeAccommodationImages accommodationId={accommodation.id}/>

      <div className='hotel-detail-container'>
        <div className='flex gap-32 w-full margin-top-50'>

          <div className='hotel-info-n-rooms'>
            <h4 className='hotel-header-title-section-h4'>Thông tin</h4>
            <p className='hotel-info'>{accommodation.info}</p> 
            <br/>      

            <h4 className='hotel-header-title-section-h4'>Tìm phòng trống theo ngày</h4>     
            <RoomAvailabilityButton accommodationId={accommodation.id}/>

            <h4 className='hotel-header-title-section-h4 margin-top-30'>Tất cả các phòng</h4>     
            <UserTakeRooms accommodationId={accommodation.id}/>

            <h4 className='hotel-header-title-section-h4'>Review</h4>   
            <AccommodationReview accommodationId={accommodation.id}/>
          </div>

          <div className='hotel-amenity-payment'>
            <div className='hotel-amenity-payment_amenity-card'>
              <div className='cac-tien-ich'>Các tiện ích</div>
              <UserTakeAmenity accommodationId={accommodation.id}/>
            </div>
            <div className='hotel-amenity-payment_amenity-card'>
              <div className='cac-tien-ich'>Phương thức thanh toán</div>
              <UserTakePayment accommodationId={accommodation.id}/>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default AccommodationDetails;
