import React, { useEffect, useState } from 'react';
import axios from './axiosConfig';
import UserTakeRoomImages from './UserTakeRoomImages';
import UserTakeRoomAmenity from './UserTakeRoomAmenity';
import UserPaymentButton from './UserPaymentButton';

import './UserTakeRooms.css';

const UserTakeRooms = ({ accommodationId }) => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(`/accommodation/${accommodationId}/rooms`);
        setRooms(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching rooms:', error);
        // Handle error
        setLoading(false);
      }
    };

    fetchRooms();
  }, [accommodationId]);

  const [roomPopups, setRoomPopups] = useState({});
  const toggleRoomPopup = (roomId) => {
    setRoomPopups((prevRoomPopups) => ({
      ...prevRoomPopups,
      [roomId]: !prevRoomPopups[roomId],
    }));
  };  

  return (
    <div>
      {loading && <p>Loading rooms...</p>}
      {!loading && rooms.length === 0 && <p>No rooms available.</p>}
      {!loading && rooms.length > 0 && (
        <div className='margin-top-30'>
          {/* <h2>Tất cả các phòng của khách sạn</h2> */}
          <div>
            {rooms.map((room) => (
              <div key={room.id}>
                {/* <p>{room.room_name}</p> */}
                <button className={`item-room-button room-item-room-button ${roomPopups[room.id] ? 'active' : ''}`} onClick={() => toggleRoomPopup(room.id)}> {room.room_name} </button>

                {roomPopups[room.id] && (
                  <div className='user-get-room-card'>
                    <div>
                      {/* <p>Sức chứa: {room.capacity}</p>
                      <p>Giá(1 đêm): {room.price}</p>
                      <p>Xếp hạng: {room.tier}</p>
                      <p>Trạng thái: {room.status ? 'Sẵn sàng' : 'Đã có người đặt'}</p>
                      <p>Thông tin phòng: {room.info}</p> */}

                      <div className='user-get-room-info-card'>
                        <h2>Thông tin phòng</h2>
                        <br />
                        <strong>Sức chứa:</strong> {room.capacity}
                        <br />
                        <strong>Giá:</strong> {room.price}
                        <br />
                        <strong>Xếp hạng:</strong> {room.tier}
                        <br />
                        <strong>Trạng thái:</strong> {room.status ? "Có sẵn" : "Có người đặt"}
                        <br />
                        <strong>Thông tin thêm:</strong> {room.info}
                        <br />  
                      </div>    

                      <hr className='user-view-room-info-hr'/>
                      <>
                      <UserTakeRoomImages roomId={room.id}/>
                      </>

                      <hr className='user-view-room-info-hr'/>
                      <>
                      <UserTakeRoomAmenity roomId={room.id}/>
                      </>

                      <hr className='user-view-room-info-hr'/>
                      <>
                      <UserPaymentButton accommodationId={accommodationId} roomId={room.id}/>
                      </>
                    </div>
                  </div>
                )}
              </div>
              
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTakeRooms;
