import React, { useState, useEffect } from 'react';
import axios from './axiosConfig';

const GetRoomNameBy = ({ roomId }) => {
  const [roomData, setRoomData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/room/get_room/${roomId}`);
        setRoomData(response.data);
      } catch (error) {
        console.error('Error fetching room data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [roomId]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : roomData ? (
        <p>Tên phòng: {roomData.room_name}</p>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default GetRoomNameBy;
