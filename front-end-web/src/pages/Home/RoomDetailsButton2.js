import React, { useState, useEffect } from 'react';
import axios from '../Home/axiosConfig';
import UserTakeRoomImages from './UserTakeRoomImages';
import UserTakeRoomAmenity from './UserTakeRoomAmenity';
import UserPaymentButton from './UserPaymentButton';
import UserPaymentButton2 from './UserPaymentButton2';



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

  return (
    <div>
      <button onClick={handleButtonClick}>Chi tiết phòng {roomId}</button>

      {isPopupOpen && (
        <div className="popup">
          {roomDetails ? (
            <div>
              <p>{roomDetails.room_name}</p>
              <p>Sức chứa {roomDetails.capacity}</p>
              <p>Thông tin: {roomDetails.info}</p>
              <p>Giá(1 đêm): {roomDetails.price}</p>
              {/* <p>Trạng thái: {roomDetails.status ? 'Available' : 'Occupied'}</p> */}
              <p>Hạng phòng {roomDetails.tier}</p>

              <UserTakeRoomAmenity roomId={roomDetails.id}/>
              <UserTakeRoomImages roomId={roomDetails.id}/>

              {/* <UserPaymentButton roomId={roomDetails.id} accommodationId={accommodationId}/> */}
              <UserPaymentButton2 roomId={roomDetails.id} accommodationId={accommodationId} checkinDate={checkin} checkoutDate={checkout}/>

              <button onClick={handleClosePopup}>Đóng</button>
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
