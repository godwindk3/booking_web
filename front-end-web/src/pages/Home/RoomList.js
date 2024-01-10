import React, { useState, useEffect } from 'react';
import axios from './axiosConfig';
import ImageRoom from './ImageRoom';
import ImageRoomUpload from './ImageRoomUpload';
import './RoomList.css';
import RoomAmenity from './RoomAmenity';

const RoomList = ({ accommodationId }) => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updateFormData, setUpdateFormData] = useState({
    room_name: '',
    capacity: '',
    price: '',
    status: true,
    tier: '',
    info: '',
  });
  const [createFormData, setCreateFormData] = useState({
    room_name: '',
    capacity: '',
    price: '',
    status: true,
    tier: '',
    info: '',
  });
  const [selectedRoomId, setSelectedRoomId] = useState(null);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/accommodation/${accommodationId}/rooms`);
      setRooms(response.data);
    } catch (error) {
      console.error('Error fetching rooms:', error.message);
    } finally {
      setLoading(false);
    }
  };
  const [counter, setCounter] = useState(0);

  // Callback function to update state in Component A
  const handleButtonClick = () => {
    setCounter(prevCounter => prevCounter + 1);
  };

  useEffect(() => {
    if (accommodationId) {
      fetchRooms();
    }
  }, [accommodationId]);

  const handleUpdateRoom = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `/room/${selectedRoomId}`,
        {
          accommodationID: accommodationId,
          ...updateFormData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      fetchRooms();
      setUpdateFormData({
        room_name: '',
        capacity: '',
        price: '',
        status: true,
        tier: '',
        info: '',
      });
      setSelectedRoomId(null);
    } catch (error) {
      console.error('Error updating room:', error.message);
    }
  };

  const handleCreateRoom = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        '/room/',
        {
          accommodationID: accommodationId,
          ...createFormData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      fetchRooms();
      setCreateFormData({
        room_name: '',
        capacity: '',
        price: '',
        status: true,
        tier: '',
        info: '',
      });
    } catch (error) {
      console.error('Error creating room:', error.message);
    }
  };

  const handleDeleteRoom = async (roomId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/room/${roomId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchRooms();
    } catch (error) {
      console.error('Error deleting room:', error.message);
    }
  };

  // const handleRoomSelect = (roomId) => {
  //   setSelectedRoomId(roomId);
  //   setUpdateFormData({
  //     room_name: '',
  //     capacity: '',
  //     price: '',
  //     status: true,
  //     tier: '',
  //     info: '',
  //   });
  // };
  const handleRoomSelect = (roomId) => {
    setSelectedRoomId(roomId);

    // Find the selected room in the rooms array
    const selectedRoom = rooms.find(room => room.id === roomId);

    // If the selected room is found, use its values as defaults
    if (selectedRoom) {
      setUpdateFormData({
        room_name: selectedRoom.room_name || '',
        capacity: selectedRoom.capacity || '',
        price: selectedRoom.price || '',
        status: selectedRoom.status || true,
        tier: selectedRoom.tier || '',
        info: selectedRoom.info || '',
      });
    } else {
      // If the selected room is not found, use default values
      setUpdateFormData({
        room_name: '',
        capacity: '',
        price: '',
        status: true,
        tier: '',
        info: '',
      });
    }
  };

  return (
    <div>
      <div className='create-room-list-card'>
        <h2 className='view-roomlist-header-h2'>Quản lý phòng trong khách sạn của bạn </h2>

        <form className='create-room-list-container'>
          {/* Input fields for creating a new room */}
          <label htmlFor="createRoomName"></label>
          <input
            type="text"
            id="createRoomName"
            value={createFormData.room_name}
            onChange={(e) => setCreateFormData({ ...createFormData, room_name: e.target.value })}
            placeholder='Tên Phòng'
          />

          <label htmlFor="createCapacity"></label>
          <input
            type="text"
            id="createCapacity"
            value={createFormData.capacity}
            onChange={(e) => setCreateFormData({ ...createFormData, capacity: e.target.value })}
            placeholder='Sức chứa'
          />

          <label htmlFor="createPrice"></label>
          <input
            type="text"
            id="createPrice"
            value={createFormData.price}
            onChange={(e) => setCreateFormData({ ...createFormData, price: e.target.value })}
            placeholder='Giá'
          />

          <label htmlFor="createTier"></label>
          <input
            type="text"
            id="createTier"
            value={createFormData.tier}
            onChange={(e) => setCreateFormData({ ...createFormData, tier: e.target.value })}
            placeholder='Xếp hạng'
          />

          <label htmlFor="createInfo"></label>
          <input
            type="text"
            id="createInfo"
            value={createFormData.info}
            onChange={(e) => setCreateFormData({ ...createFormData, info: e.target.value })}
            placeholder='Thông tin thêm'
          />

          <label htmlFor="createStatus"></label>
          <input
            type="checkbox"
            id="createStatus"
            checked={createFormData.status}
            onChange={(e) => setCreateFormData({ ...createFormData, status: e.target.checked })}
            placeholder='Trạng thái'
          />

        </form>
        {/* Create button for sending the create request */}
        <button className='create-room-button' onClick={handleCreateRoom}>Tạo phòng</button>
      </div>

      {loading && <p>Loading rooms...</p>}

      {!loading && rooms.length === 0 && <p>No rooms available for this accommodation.</p>}

      {!loading && rooms.length > 0 && (
        <ul>
          {rooms.map((room) => (
            <li key={room.id}>
              {console.log(room.id)}
              <strong>Tên phòng:</strong> {room.room_name}
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
              <button onClick={() => handleRoomSelect(room.id)}>Cập nhật phòng</button>
              <button onClick={() => handleDeleteRoom(room.id)}>Xóa phòng</button>
              <ImageRoomUpload roomId={room.id} onButtonClick={handleButtonClick} />
              <ImageRoom roomId={room.id} />
              <RoomAmenity roomId={room.id} />
              {selectedRoomId === room.id && (
                <div>
                  {/* Input fields for updating room details */}
                  <label htmlFor="updateRoomNumber">Tên phòng:</label>
                  <input
                    type="text"
                    id="updateRoomNumber"
                    value={updateFormData.room_name}
                    onChange={(e) =>
                      setUpdateFormData({ ...updateFormData, room_name: e.target.value })
                    }
                  />

                  <label htmlFor="updateCapacity">Sức chứa:</label>
                  <input
                    type="text"
                    id="updateCapacity"
                    value={updateFormData.capacity}
                    onChange={(e) =>
                      setUpdateFormData({ ...updateFormData, capacity: e.target.value })
                    }
                  />

                  <label htmlFor="updatePrice">Giá:</label>
                  <input
                    type="text"
                    id="updatePrice"
                    value={updateFormData.price}
                    onChange={(e) =>
                      setUpdateFormData({ ...updateFormData, price: e.target.value })
                    }
                  />

                  <label htmlFor="updateStatus">Trạng thái:</label>
                  <input
                    type="checkbox"
                    id="updateStatus"
                    checked={updateFormData.status}
                    onChange={(e) =>
                      setUpdateFormData({ ...updateFormData, status: e.target.checked })
                    }
                  />

                  <label htmlFor="updateTier">Xếp hạng:</label>
                  <input
                    type="text"
                    id="updateTier"
                    value={updateFormData.tier}
                    onChange={(e) =>
                      setUpdateFormData({ ...updateFormData, tier: e.target.value })
                    }
                  />
                  <label htmlFor="updateInfo">Thông tin thêm:</label>
                  <input
                    type="text"
                    id="updateInfo"
                    value={updateFormData.info}
                    onChange={(e) =>
                      setUpdateFormData({ ...updateFormData, info: e.target.value })
                    }
                  />

                  {/* Update button for sending the update request */}
                  <button onClick={handleUpdateRoom}>Xác nhận cập nhật</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RoomList;
