import React, { useState, useEffect } from 'react';
import axios from './axiosConfig';

const GetPriceAccommodation = ({ accommodationId }) => {
  const [priceData, setPriceData] = useState({ min_price: 0, max_price: 0 });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/accommodation/${accommodationId}/get_price`);
        setPriceData(response.data);
        setError('');
      } catch (error) {
        console.error('Error fetching price data:', error);
        setError('Error fetching price data. Please try again.');
      }
    };

    // Only fetch data if accommodationId is provided
    if (accommodationId) {
      fetchData();
    }
  }, [accommodationId]);

  return (
    <div className='acco-content-container-price'>
      
      {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
      <span>Khoảng giá: {priceData.min_price} - {priceData.max_price} VND/Đêm</span>
    </div>
  );
};

export default GetPriceAccommodation;
