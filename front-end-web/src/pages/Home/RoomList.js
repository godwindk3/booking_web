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
    room_number: '',
    capacity: '',
    price: '',
    status: true,
    tier: '',
  });
  const [createFormData, setCreateFormData] = useState({
    room_number: '',
    capacity: '',
    price: '',
    status: true,
    tier: '',
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
        room_number: '',
        capacity: '',
        price: '',
        status: true,
        tier: '',
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
        room_number: '',
        capacity: '',
        price: '',
        status: true,
        tier: '',
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
      room_number: '',
      capacity: '',
      price: '',
      status: true,
      tier: '',
    });
  };

  return (
    <div>
      <h2>Rooms for Accommodation ID: {accommodationId}</h2>

      {/* Input fields for creating a new room */}
      <label htmlFor="createRoomNumber">Room Number:</label>
      <input
        type="text"
        id="createRoomNumber"
        value={createFormData.room_number}
        onChange={(e) => setCreateFormData({ ...createFormData, room_number: e.target.value })}
      />

      <label htmlFor="createCapacity">Capacity:</label>
      <input
        type="text"
        id="createCapacity"
        value={createFormData.capacity}
        onChange={(e) => setCreateFormData({ ...createFormData, capacity: e.target.value })}
      />

      <label htmlFor="createPrice">Price:</label>
      <input
        type="text"
        id="createPrice"
        value={createFormData.price}
        onChange={(e) => setCreateFormData({ ...createFormData, price: e.target.value })}
      />

      <label htmlFor="createStatus">Status:</label>
      <input
        type="checkbox"
        id="createStatus"
        checked={createFormData.status}
        onChange={(e) => setCreateFormData({ ...createFormData, status: e.target.checked })}
      />

      <label htmlFor="createTier">Tier:</label>
      <input
        type="text"
        id="createTier"
        value={createFormData.tier}
        onChange={(e) => setCreateFormData({ ...createFormData, tier: e.target.value })}
      />

      {/* Create button for sending the create request */}
      <button onClick={handleCreateRoom}>Create</button>

      {loading && <p>Loading rooms...</p>}

      {!loading && rooms.length === 0 && <p>No rooms available for this accommodation.</p>}

      {!loading && rooms.length > 0 && (
        <ul>
          {rooms.map((room) => (
            <li key={room.id}>
              <strong>Room Number:</strong> {room.room_number}
              <br />
              <strong>Capacity:</strong> {room.capacity}
              <br />
              <strong>Price:</strong> {room.price}
              <br />
              <strong>Tier:</strong> {room.tier}
              <br />
              <strong>Status:</strong> {room.status.toString()}
              <br />
              <button onClick={() => handleRoomSelect(room.id)}>Update</button>
              <button onClick={() => handleDeleteRoom(room.id)}>Delete</button>
              {selectedRoomId === room.id && (
                <div>
                  {/* Input fields for updating room details */}
                  <label htmlFor="updateRoomNumber">Room Number:</label>
                  <input
                    type="text"
                    id="updateRoomNumber"
                    value={updateFormData.room_number}
                    onChange={(e) =>
                      setUpdateFormData({ ...updateFormData, room_number: e.target.value })
                    }
                  />

                  <label htmlFor="updateCapacity">Capacity:</label>
                  <input
                    type="text"
                    id="updateCapacity"
                    value={updateFormData.capacity}
                    onChange={(e) =>
                      setUpdateFormData({ ...updateFormData, capacity: e.target.value })
                    }
                  />

                  <label htmlFor="updatePrice">Price:</label>
                  <input
                    type="text"
                    id="updatePrice"
                    value={updateFormData.price}
                    onChange={(e) =>
                      setUpdateFormData({ ...updateFormData, price: e.target.value })
                    }
                  />

                  <label htmlFor="updateStatus">Status:</label>
                  <input
                    type="checkbox"
                    id="updateStatus"
                    checked={updateFormData.status}
                    onChange={(e) =>
                      setUpdateFormData({ ...updateFormData, status: e.target.checked })
                    }
                  />

                  <label htmlFor="updateTier">Tier:</label>
                  <input
                    type="text"
                    id="updateTier"
                    value={updateFormData.tier}
                    onChange={(e) =>
                      setUpdateFormData({ ...updateFormData, tier: e.target.value })
                    }
                  />

                  {/* Update button for sending the update request */}
                  <button onClick={handleUpdateRoom}>Confirm Update</button>
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
