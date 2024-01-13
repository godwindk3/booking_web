// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';  // Import Link from react-router-dom
// import axios from './axiosConfig';

// const FilterPrice = ({ minPrice, maxPrice, setDataArray, dataArray }) => {
//   const [searchResults, setSearchResults] = useState([]);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Convert minPrice and maxPrice to float
//         const minPriceFloat = parseFloat(minPrice);
//         const maxPriceFloat = parseFloat(maxPrice);

//         const response = await axios.post('/filter/price', {
//           min_price: minPriceFloat,
//           max_price: maxPriceFloat,
//         });

//         setSearchResults(response.data);
//         setError('');
//       } catch (error) {
//         console.error('Error filtering by price:', error);
//         setSearchResults([]);
//         setError('Error filtering by price. Please try again.');
//       }
//     };

//     // Only fetch data if both minPrice and maxPrice are provided and not empty
//     if (
//       minPrice !== undefined &&
//       maxPrice !== undefined &&
//       minPrice !== null &&
//       maxPrice !== null &&
//       minPrice.trim() !== '' &&
//       maxPrice.trim() !== ''
//     ) {
//       fetchData();
//     }
//   }, [minPrice, maxPrice]);

//   return (
//     <div>
//       {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}

//       {searchResults.length > 0 && (
//         <div>
//           <h2 className='h2-header'>Kết quả tìm kiếm:</h2>
//           <div>
//             {searchResults.map((result) => (
//               <div className="filter-accommodation-card" key={result.id}>

//                 {/* Use Link to make the Name clickable and navigate to the specified route */}
//                 <Link to={`/getaccommodation/${result.id}`} className='filter-accommodation-container'>
//                   <div className='filter-accommodation-li'>
//                     {/* <strong>Name:</strong> */}
//                     {result.name}
//                     <br />
//                     {/* <strong>Location:</strong>  */}
//                     {result.location}
//                     <br />
//                     {/* <strong>Info:</strong>  */}
//                     {/* {result.info} */}
//                   </div>
//                 </Link>

//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FilterPrice;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from './axiosConfig';

const FilterPrice = ({ minPrice, maxPrice, setDataArray, dataArray }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const minPriceFloat = parseFloat(minPrice);
        const maxPriceFloat = parseFloat(maxPrice);

        const response = await axios.post('/filter/price', {
          min_price: minPriceFloat,
          max_price: maxPriceFloat,
        });

        setSearchResults(response.data);
        setError('');

        // Use setDataArray function to add each object from the API response to the parent component's array
        response.data.forEach((item) => {
          setDataArray((prevData) => [...prevData, item]);
        });
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
  }, [minPrice, maxPrice, setDataArray]);

  // This component doesn't return anything visible
  return null;
};

export default FilterPrice;
