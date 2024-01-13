// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';  // Import Link from react-router-dom
// import axios from './axiosConfig';

// const FilterLocation = ({ location, setDataArray, dataArray }) => {
//   const [searchResults, setSearchResults] = useState([]);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.post(`/filter/location/${location}`);
//         setSearchResults(response.data);
//         setError('');
//       } catch (error) {
//         console.error('Error filtering by location:', error);
//         setSearchResults([]);
//         setError('Error filtering by location. Please try again.');
//       }
//     };

//     // Only fetch data if location is provided
//     if (location) {
//       fetchData();
//     }
//   }, [location]);

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
//                     {result.location}<br />
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

// export default FilterLocation;
import React, { useState, useEffect } from 'react';
import axios from './axiosConfig';

const FilterLocation = ({ location, setDataArray, dataArray }) => {
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`/filter/location/${location}`);
        setError('');

        // Use setDataArray function to add each object from the API response to the parent component's array
        response.data.forEach((item) => {
          setDataArray((prevData) => [...prevData, item]);
        });
      } catch (error) {
        console.error('Error filtering by location:', error);
        setError('Error filtering by location. Please try again.');
      }
    };

    // Only fetch data if location is provided
    if (location) {
      fetchData();
    }
  }, [location, setDataArray]);

  // This component doesn't return anything visible
  return null;
};

export default FilterLocation;
