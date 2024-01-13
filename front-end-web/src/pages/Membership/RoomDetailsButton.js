import React, { useState, useEffect } from 'react';
import axios from '../Home/axiosConfig';
import UserTakeRoomImages from '../Home/UserTakeRoomImages';
import UserTakeRoomAmenity from '../Home/UserTakeRoomAmenity';

import './RoomDetailsButton.css'

const RoomDetailsButton = ({ roomId }) => {
  const [roomDetails, setRoomDetails] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const response = await axios.get(`/room/get_room/${roomId}`);
        setRoomDetails(response.data);
      } catch (error) {
        console.error('Error fetching room details:', error);
        // Handle error
      }
    };

    if (isPopupOpen) {
      fetchRoomDetails();
    }
  }, [roomId, isPopupOpen]);

  const handleButtonClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div>
      <button className='user-cancel-booking-button' onClick={togglePopup}>Chi tiết phòng</button>

      {isPopupOpen && (
        <div className="popup">
          {roomDetails ? (

            <div className='your-booked-hotel-card'>
              <div className='your-booked-hotel-container'>
                <h2 className='your-booked-hotel-header-vcl-xin-m-day-csss'>{roomDetails.room_name}</h2>

                <div className='your-booked-hotel-details'>
                  <div> <strong>Sức chứa:</strong> {roomDetails.capacity}</div>
                  <div> <strong>Hạng phòng:</strong> {roomDetails.tier}</div>
                  <div> <strong>Giá (1 đêm):</strong> {roomDetails.price}VND</div>
                  <div> <strong>Thông tin:</strong> {roomDetails.info}</div>
                </div>
                
                {/* <p>Trạng thái: {roomDetails.status ? 'Available' : 'Occupied'}</p> */}
                <UserTakeRoomAmenity roomId={roomDetails.id}/>
                <UserTakeRoomImages roomId={roomDetails.id}/>

                {/* <button onClick={handleClosePopup}>Đóng</button> */}
              </div>
            </div>

          ) : (
            <p>Loading...</p>
          )}
        </div>
      )}

    </div>
  );
};

export default RoomDetailsButton;
