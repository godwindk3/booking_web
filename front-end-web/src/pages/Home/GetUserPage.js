import React, { useState, useEffect } from 'react';
import axios from './axiosConfig'; // Import the Axios instance

const GetUserPage = () => {
  const [userIdInput, setUserIdInput] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUserData = async (id) => {
    try {
      // Make a GET request to fetch user data using the configured Axios instance
      const response = await axios.get(`/admin/users/${id}`);

      // Log the response for debugging
      console.log('Server Response:', response);

      // Update state with the fetched data
      setUserData(response.data);
    } catch (error) {
      // Log and handle errors
      console.error('Error fetching user data:', error.message);
      setError(error.message);
    } finally {
      // Update loading state
      setLoading(false);
    }
  };

  const handleUserIdChange = (e) => {
    setUserIdInput(e.target.value);
  };

  const handleFetchUserData = () => {
    setLoading(true);
    setUserData(null);
    setError(null);
    fetchUserData(userIdInput);
  };

  return (
    <div>
      <h2>Get User Details</h2>
      <label>
        Enter User ID:
        <input
          type="text"
          value={userIdInput}
          onChange={handleUserIdChange}
        />
      </label>
      <button onClick={handleFetchUserData}>Fetch User Data</button>

      {/* Display loading state while fetching data */}
      {loading && <p>Loading...</p>}

      {/* Display error message if there's an error */}
      {error && <p>Error: {error}</p>}

      {/* Display user data */}
      {userData && (
        <div>
          <h2>User Details</h2>
          <ul>
            <li>Name: {userData.name}</li>
            <li>Email: {userData.email}</li>
            <li>Role: {userData.role}</li>
            {/* Add more details as needed */}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GetUserPage;
