import React, { useState, useEffect } from 'react';
import axios from './axiosConfig';

const UserProfile = ({ userId }) => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/user/${userId}`);
        setUserData(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setUserData(null);
        setError('Error fetching user data. Please try again.');
      }
    };

    // Fetch user data only if userId is provided
    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  return (
    <div>
      {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
      
      {userData && (
        <div>
          <p><strong>Khách hàng: </strong> {userData.name}</p>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
