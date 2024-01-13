import React, { useState, useEffect } from 'react';
import axios from '../Home/axiosConfig';
import UserTakeRoomImages from './UserTakeRoomImages';
import UserTakeRoomAmenity from './UserTakeRoomAmenity';
import UserPaymentButton from './UserPaymentButton';
import UserPaymentButton2 from './UserPaymentButton2';

import './RoomDetailsButton2.css';


const RoomDetailsButton2 = ({ roomId, accommodationId, checkin, checkout }) => {
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

  const [isActive, setIsActive] = useState(false);
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
    setIsActive(!isActive);
  };

  return (
    <div>
      <button className={`find-room-by-date-result-button${isActive ? " active" : ""}`} 
              onClick={togglePopup}>Chi tiết phòng {roomId}
      </button>

      {isPopupOpen && (
        <div className="popup">

          {roomDetails ? (
            <div className='user-get-room-card'>
              <h2 className='user-roomdetailsbutton2-header'>{roomDetails.room_name}</h2>

              <div className='user-get-room-info-card'>
                <div> <strong>Sức chứa:</strong> {roomDetails.capacity}</div>
                <div> <strong>Hạng phòng:</strong> {roomDetails.tier}</div>
                <div> <strong>Giá (1 đêm):</strong> {roomDetails.price}</div>
                <div> <strong>Thông tin:</strong> {roomDetails.info}</div>
                {/* <p>Trạng thái: {roomDetails.status ? 'Available' : 'Occupied'}</p> */}
              </div>
              
              <hr className='user-view-room-info-hr'/>
              <UserTakeRoomAmenity roomId={roomDetails.id}/>

              <hr className='user-view-room-info-hr'/>
              <UserTakeRoomImages roomId={roomDetails.id}/>

              <hr className='user-view-room-info-hr'/>
              <UserPaymentButton2 roomId={roomDetails.id} accommodationId={accommodationId} checkinDate={checkin} checkoutDate={checkout}/>

              {/* <button onClick={handleClosePopup}>Đóng</button> */}
            </div>

          ) : (
            <p>Loading...</p>
          )}
          
        </div>
      )}
      
    </div>
  );
};

export default RoomDetailsButton2;
