import React, { useState, useEffect } from 'react';
import axios from './axiosConfig';

import './GetUserNameById.css'

const UserProfile = ({ userId }) => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/user/get_by_id/${userId}`);
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
        <div >
          <strong>{userData.name}</strong> 
        </div>
      )}
    </div>
  );
};

export default UserProfile;
