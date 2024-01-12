import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import axios from './axiosConfig';

import './FilterAccommodation.css'

const FilterAccommodation = ({ accommodationId }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`/filter/search/${accommodationId}`);
        setSearchResults(response.data);
        setError('');
      } catch (error) {
        console.error('Error searching accommodations:', error);
        setSearchResults([]);
        setError('Error searching accommodations. Please try again.');
      }
    };

    // Only fetch data if accommodationId is provided
    if (accommodationId) {
      fetchData();
    }
  }, [accommodationId]);

  return (
    <div>
      {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}

      {searchResults.length > 0 && (
        <div>
          <h2 className='h2-header'>Kết quả tìm kiếm:</h2>
          
          <div>
            {searchResults.map((result) => (
              <div className="filter-accommodation-card" key={result.id}>
                <Link to={`/getaccommodation/${result.id}`} className='filter-accommodation-container'>
                  <div className='filter-accommodation-li'>
                    {/* <strong>Name:</strong> */}
                    {result.name}
                    <br />
                    {/* <strong>Location:</strong> */}
                    {result.location}
                    <br />
                    {/* <strong>Info:</strong> */}
                    {/* {result.info} */}
                  </div>
                </Link>
              </div>
            ))}
          </div>

          
        </div>
      )}
    </div>
  );
};

export default FilterAccommodation;
