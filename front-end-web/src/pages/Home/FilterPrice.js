import React, { useState, useEffect } from 'react';
import axios from './axiosConfig';

const FilterPrice = ({ minPrice, maxPrice }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Convert minPrice and maxPrice to float
        const minPriceFloat = parseFloat(minPrice);
        const maxPriceFloat = parseFloat(maxPrice);

        const response = await axios.post('/filter/price', {
          min_price: minPriceFloat,
          max_price: maxPriceFloat,
        });

        setSearchResults(response.data);
        setError('');
        console.log(response.data)
      } catch (error) {
        console.error('Error filtering by price:', error);
        setSearchResults([]);
        setError('Error filtering by price. Please try again.');
      }
    };

    // Only fetch data if both minPrice and maxPrice are provided and not empty
    if (
      minPrice !== undefined &&
      maxPrice !== undefined &&
      minPrice !== null &&
      maxPrice !== null &&
      minPrice.trim() !== '' &&
      maxPrice.trim() !== ''
    ) {
      fetchData();
    }
  }, [minPrice, maxPrice]);

  return (
    <div>

      {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}

      {searchResults.length > 0 && (
        <div>
          <h3>Search Results:</h3>
          <ul>
            {searchResults.map((result) => (
              <li key={result.id}>
                <strong>Name:</strong> {result.name}<br />
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

export default FilterPrice;
