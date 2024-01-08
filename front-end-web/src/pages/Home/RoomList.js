// import React, { useState, useEffect } from 'react';
// import axios from './axiosConfig';

// const RoomList = ({ accommodationId }) => {
//   const [rooms, setRooms] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [updateFormData, setUpdateFormData] = useState({
//     room_number: '',
//     capacity: '',
//     price: '',
//     status: true,
//     tier: '',
//   });
//   const [selectedRoomId, setSelectedRoomId] = useState(null);

//   const fetchRooms = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(`/accommodation/${accommodationId}/rooms`);
//       setRooms(response.data);
//     } catch (error) {
//       console.error('Error fetching rooms:', error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (accommodationId) {
//       fetchRooms();
//     }
//   }, [accommodationId]);

//   const handleUpdateRoom = async () => {
//     try {
//       // Get the token from local storage
//       const token = localStorage.getItem('token');

//       // Make a PUT request to update the room
//       await axios.put(
//         `/room/${selectedRoomId}`,
//         {
//           accommodationID: accommodationId,
//           ...updateFormData,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       // After successful update, fetch the updated list of rooms
//       fetchRooms();

//       // Reset the form data and selected room ID
//       setUpdateFormData({
//         room_number: '',
//         capacity: '',
//         price: '',
//         status: true,
//         tier: '',
//       });
//       setSelectedRoomId(null);
//     } catch (error) {
//       console.error('Error updating room:', error.message);
//     }
//   };

//   const handleDeleteRoom = async (roomId) => {
//     try {
//       // Get the token from local storage
//       const token = localStorage.getItem('token');

//       // Make a DELETE request to delete the room
//       await axios.delete(`/room/${roomId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       // After successful deletion, fetch the updated list of rooms
//       fetchRooms();
//     } catch (error) {
//       console.error('Error deleting room:', error.message);
//     }
//   };

//   const handleRoomSelect = (roomId) => {
//     // Set the selected room ID and reset the form data
//     setSelectedRoomId(roomId);
//     setUpdateFormData({
//       room_number: '',
//       capacity: '',
//       price: '',
//       status: true,
//       tier: '',
//     });
//   };

//   return (
//     <div>
//       <h2>Quản lý phòng cho khách sạn của bạn</h2>

//       {loading && <p>Loading rooms...</p>}

//       {!loading && rooms.length === 0 && <p>No rooms available for this accommodation.</p>}

//       {!loading && rooms.length > 0 && (
//         <ul>
//           {rooms.map((room) => (
//             <li key={room.id}>
//               <strong>Room Number:</strong> {room.room_number}
//               <br />
//               <strong>Capacity:</strong> {room.capacity}
//               <br />
//               <strong>Price:</strong> {room.price}
//               <br />
//               <strong>Tier: </strong> {room.tier}
//               <br />
//               <strong>Status:</strong> {room.status.toString()}
//               <br />
//               {/* Add more room details as needed */}

//               {/* Update and Delete buttons */}
//               <button onClick={() => handleRoomSelect(room.id)}>Update</button>
//               <button onClick={() => handleDeleteRoom(room.id)}>Delete</button>

//               {selectedRoomId === room.id && (
//                 <div>
//                   {/* Input fields for updating room details */}
//                   <label htmlFor="updateRoomNumber">Room Number:</label>
//                   <input
//                     type="text"
//                     id="updateRoomNumber"
//                     value={updateFormData.room_number}
//                     onChange={(e) =>
//                       setUpdateFormData({ ...updateFormData, room_number: e.target.value })
//                     }
//                   />

//                   <label htmlFor="updateCapacity">Capacity:</label>
//                   <input
//                     type="text"
//                     id="updateCapacity"
//                     value={updateFormData.capacity}
//                     onChange={(e) =>
//                       setUpdateFormData({ ...updateFormData, capacity: e.target.value })
//                     }
//                   />

//                   <label htmlFor="updatePrice">Price:</label>
//                   <input
//                     type="text"
//                     id="updatePrice"
//                     value={updateFormData.price}
//                     onChange={(e) =>
//                       setUpdateFormData({ ...updateFormData, price: e.target.value })
//                     }
//                   />

//                   <label htmlFor="updateStatus">Status:</label>
//                   <input
//                     type="checkbox"
//                     id="updateStatus"
//                     checked={updateFormData.status}
//                     onChange={(e) =>
//                       setUpdateFormData({ ...updateFormData, status: e.target.checked })
//                     }
//                   />

//                   <label htmlFor="updateTier">Tier:</label>
//                   <input
//                     type="text"
//                     id="updateTier"
//                     value={updateFormData.tier}
//                     onChange={(e) =>
//                       setUpdateFormData({ ...updateFormData, tier: e.target.value })
//                     }
//                   />

//                   {/* Update button for sending the update request */}
//                   <button onClick={handleUpdateRoom}>Confirm Update</button>
//                 </div>
//               )}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default RoomList;
import React, { useState, useEffect } from 'react';
import axios from './axiosConfig';

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

  const handleRoomSelect = (roomId) => {
    setSelectedRoomId(roomId);
    setUpdateFormData({
      room_name: '',
      capacity: '',
      price: '',
      status: true,
      tier: '',
      info: '',
    });
  };

  return (
    <div>
      <h2>Quản lý phòng trong khách sạn của bạn </h2>

      {/* Input fields for creating a new room */}
      <label htmlFor="createRoomName">Tên Phòng:</label>
      <input
        type="text"
        id="createRoomName"
        value={createFormData.room_name}
        onChange={(e) => setCreateFormData({ ...createFormData, room_name: e.target.value })}
      />

      <label htmlFor="createCapacity">Sức chứa:</label>
      <input
        type="text"
        id="createCapacity"
        value={createFormData.capacity}
        onChange={(e) => setCreateFormData({ ...createFormData, capacity: e.target.value })}
      />

      <label htmlFor="createPrice">Giá:</label>
      <input
        type="text"
        id="createPrice"
        value={createFormData.price}
        onChange={(e) => setCreateFormData({ ...createFormData, price: e.target.value })}
      />

      <label htmlFor="createStatus">Trạng thái:</label>
      <input
        type="checkbox"
        id="createStatus"
        checked={createFormData.status}
        onChange={(e) => setCreateFormData({ ...createFormData, status: e.target.checked })}
      />

      <label htmlFor="createTier">Xếp hạng:</label>
      <input
        type="text"
        id="createTier"
        value={createFormData.tier}
        onChange={(e) => setCreateFormData({ ...createFormData, tier: e.target.value })}
      />
      <label htmlFor="createInfo">Thông tin thêm:</label>
      <input
        type="text"
        id="createInfo"
        value={createFormData.info}
        onChange={(e) => setCreateFormData({ ...createFormData, info: e.target.value })}
      />

      {/* Create button for sending the create request */}
      <button onClick={handleCreateRoom}>Tạo phòng</button>

      {loading && <p>Loading rooms...</p>}

      {!loading && rooms.length === 0 && <p>No rooms available for this accommodation.</p>}

      {!loading && rooms.length > 0 && (
        <ul>
          {rooms.map((room) => (
            <li key={room.id}>
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
