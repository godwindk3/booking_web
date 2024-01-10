import React, { useEffect, useState } from 'react';
import axios from './axiosConfig';
import UserTakeRoomImages from './UserTakeRoomImages';
import UserTakeRoomAmenity from './UserTakeRoomAmenity';
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

  return (
    <div>
      {loading && <p>Loading rooms...</p>}
      {!loading && rooms.length === 0 && <p>No rooms available.</p>}
      {!loading && rooms.length > 0 && (
        <div>
          <h2>Tất cả các phòng của khách sạn</h2>
          <ul>
            {rooms.map((room) => (
              <li key={room.id}>
                <p>Phòng số: {room.room_name}</p>
                <p>Sức chứa: {room.capacity}</p>
                <p>Giá(1 đêm): {room.price}</p>
                <p>Xếp hạng: {room.tier}</p>
                <p>Trạng thái: {room.status ? 'Sẵng sàng' : 'Đã có người đặt'}</p>
                <p>Thông tin phòng: {room.info}</p>
                <>
                <UserTakeRoomAmenity roomId={room.id}/>
                </>
                <>
                <UserTakeRoomImages roomId={room.id}/>
                </>
              </li>
              
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserTakeRooms;
