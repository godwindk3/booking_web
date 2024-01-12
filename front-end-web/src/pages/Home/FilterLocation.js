import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import axios from './axiosConfig';

const FilterLocation = ({ location }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`/filter/location/${location}`);
        setSearchResults(response.data);
        setError('');
      } catch (error) {
        console.error('Error filtering by location:', error);
        setSearchResults([]);
        setError('Error filtering by location. Please try again.');
      }
    };

    // Only fetch data if location is provided
    if (location) {
      fetchData();
    }
  }, [location]);

  return (
    <div>
      {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}

      {searchResults.length > 0 && (
        <div>
          <h3>Search Results:</h3>
          <ul>
            {searchResults.map((result) => (
              <li key={result.id}>
                <strong>Name:</strong>
                {/* Use Link to make the Name clickable and navigate to the specified route */}
                <Link to={`/getaccommodation/${result.id}`}>
                  {result.name}
                </Link>
                <br />
                <strong>Location:</strong> {result.location}<br />
                <strong>Info:</strong> {result.info}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FilterLocation;
