// // // // components/pages/HomePage.js
// // // import React, { useState } from 'react';
// // // import { Link } from 'react-router-dom';
// // // import { NavLink } from 'react-router-dom';
// // // import './HomePage.css'; // Import your stylesheet if needed

// // // const HomePage = () => {
// // //   const [searchHotelName, setHotelName] = useState('');
// // //   const handleChange = (event) => {
// // //     setHotelName(event.target.value);
// // //   }; 

// // //   const [location, setLocation] = useState('');
// // //   const handleLocationChange = (event) => {
// // //     setLocation(event.target.value);
// // //   };

// // //   const [priceRange, setPriceRange] = useState('');
// // //   const handlePriceRangeChange = (event) => {
// // //     setPriceRange(event.target.value);
// // //   };

// // //   return (
// // //     <div className="home-page-container">
// // //       <section className="Banner">
// // //         <div className="img-banner-container">
// // //           <img src="https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?cs=srgb&dl=pexels-pixabay-258154.jpg&fm=jpg"/>
// // //         </div>

// // //         <div className="flex flex-col justify-center gap-40 search-box card">
// // //           <div className="flex flex-col gap-16 gray-900">
// // //             <h4>Bạn đang tìm khách sạn cho kỳ nghỉ của mình?</h4>
// // //             <p>Chúng tôi có thể đem đến cho bạn những sự lựa chọn tuyệt vời nhất, những ưu đãi tốt nhất</p>
// // //           </div>

// // //           <div className="flex gap-20 align-center">
// // //             <div className="input-container">
// // //               <input type="text" placeholder="Nhập tên khách sạn" value={searchHotelName} onChange={handleChange}/>
// // //             </div>

// // //             <div className="select-location-button">
// // //               <select value={location} onChange={handleLocationChange}>
// // //                 <option value="">Tất cả các địa điểm</option>
// // //                 <option value="Hà Nội">Hà Nội</option>
// // //                 <option value="Đà Nẵng">Đà Nẵng</option>
// // //                 <option value="TP.HCM">TP.HCM</option>
// // //               </select>
// // //             </div>

// // //             <div className="select-location-button">
// // //               <select value={priceRange} onChange={handlePriceRangeChange}>
// // //                 <option value="">Tất cả các mức giá</option>
// // //                 <option value="Dưới 2 triệu">Dưới 2 triệu</option>
// // //                 <option value="Từ 2 - 5 triệu">Từ 2 - 5 triệu</option>
// // //                 <option value="Từ 5 triệu trở lên">Từ 5 triệu trở lên</option>
// // //               </select>
// // //             </div>

// // //             <div>
// // //               <button className="flex align-center gap-24 search-button">
// // //                 Tìm kiếm
// // //               </button>
// // //             </div>
// // //           </div>

// // //         </div>
// // //       </section>

// // //       <section className="Popular-section">
// // //         <div className="home-popular">

// // //         </div>

// // //       </section>
// // //     </div>
// // //   );
// // // };

// // // export default HomePage;


// import React, { useState } from 'react';
// import './HomePage.css'; // Import your stylesheet if needed
// import FilterAccommodation from './FilterAccommodation';
// import FilterLocation from './FilterLocation';
// import FilterPrice from './FilterPrice';

// const HomePage = () => {
//   const [searchHotelName, setHotelName] = useState('');
//   const handleChange = (event) => {
//     setHotelName(event.target.value);
//   };
//   const [dataArrayAccommodation, setDataArrayAccommodation] = useState([]);
//   const [dataArrayLocation, setDataArrayLocation] = useState([]);
//   const [dataArrayPrice, setDataArrayPrice] = useState([]);

//   const [location, setLocation] = useState('');
//   const handleLocationChange = (event) => {
//     setLocation(event.target.value);
//   };

//   const [minPrice, setMinPrice] = useState('');
//   const [maxPrice, setMaxPrice] = useState('');

//   const handleMinPriceChange = (event) => {
//     setMinPrice(event.target.value);
//   };

//   const handleMaxPriceChange = (event) => {
//     setMaxPrice(event.target.value);
//   };

//   const handleSearch = () => {
//     // Pass searchHotelName, location, minPrice, and maxPrice to the child component or perform other actions
//     console.log("Search Hotel Name:", searchHotelName);
//     console.log("Location:", location);
//     console.log("Min Price:", minPrice);
//     console.log("Max Price:", maxPrice);
//   };

//   return (
//     <div className="home-page-container">
//       <section className="Banner">
//         <div className="img-banner-container">
//           <img src="https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?cs=srgb&dl=pexels-pixabay-258154.jpg&fm=jpg" alt="Banner" />
//         </div>

//         <div className="flex flex-col justify-center gap-40 search-box card">
//           <div className="flex flex-col gap-16 gray-900">
//             <h4>Bạn đang tìm khách sạn cho kỳ nghỉ của mình?</h4>
//             <p>Chúng tôi có thể đem đến cho bạn những sự lựa chọn tuyệt vời nhất, những ưu đãi tốt nhất</p>
//           </div>

//           <div className="flex gap-20 align-center">
//             <div className="input-container">
//               <input type="text" placeholder="Nhập tên khách sạn" value={searchHotelName} onChange={handleChange} />
//             </div>

//             <div className="input-container">
//               <input type="text" placeholder="Tất cả các địa điểm" value={location} onChange={handleLocationChange} />
//             </div>

//             <div className="input-container">
//               <div className="flex gap-10">
//                 <input type="text" placeholder="Min Price" value={minPrice} onChange={handleMinPriceChange} />
//                 <input type="text" placeholder="Max Price" value={maxPrice} onChange={handleMaxPriceChange} />
//               </div>
//             </div>

//             <div>
//               <button className="flex align-center gap-24 search-button" onClick={handleSearch}>
//                 Tìm kiếm
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="Popular-section">
//         <div className="home-popular">
//           {/* ... your existing code ... */}
//         </div>
//       </section>
//       <FilterAccommodation accommodationId={searchHotelName} dataArray={dataArrayAccommodation} setDataArray={setDataArrayAccommodation}/>
//       <FilterLocation location={location} dataArray={dataArrayLocation} setDataArray={setDataArrayLocation}/>
//       <FilterPrice maxPrice={maxPrice} minPrice={minPrice} dataArray={dataArrayPrice} setDataArray={setDataArrayPrice}/>

//     </div>
//   );
// };

// export default HomePage;
import React, { useState, useEffect } from 'react';
import './HomePage.css'; // Import your stylesheet if needed
import axios from './axiosConfig';
import FilterAccommodation from './FilterAccommodation';
import FilterLocation from './FilterLocation';
import FilterPrice from './FilterPrice';
import { Link } from 'react-router-dom';


const HomePage = () => {
  const [searchHotelName, setHotelName] = useState('');
  const handleChange = (event) => {
    setHotelName(event.target.value);
  };
  const [searchTrigger, setSearchTrigger] = useState(0);
  const [dataArrayAccommodation, setDataArrayAccommodation] = useState([]);
  const [dataArrayLocation, setDataArrayLocation] = useState([]);
  const [dataArrayPrice, setDataArrayPrice] = useState([]);
  const [dataArrayAmenity, setDataArrayAmenity] = useState([])
  const [intersection, setIntersection] = useState([]);

  const [location, setLocation] = useState('');
  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const [amenities, setAmenities] = useState([]);

  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState('');

  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value);
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
  };

  const handleSearch = () => {
    console.log("Search Hotel Name:", searchHotelName);
    console.log("Location:", location);
    console.log("Min Price:", minPrice);
    console.log("Max Price:", maxPrice);
    setSearchTrigger(prevTrigger => prevTrigger + 1);
  };

  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedAmenitiesObjects, setSelectedAmenitiesObjects] = useState([]);

  const handleCheckboxChange = (amenityId) => {
    // Toggle the selection of the amenity
    setSelectedAmenities((prevSelectedAmenities) => {
      if (prevSelectedAmenities.includes(amenityId)) {
        return prevSelectedAmenities.filter((id) => id !== amenityId);
      } else {
        return [...prevSelectedAmenities, amenityId];
      }
    });
  };
  const fetchAmenityData = async () => {
    try {
      // Convert selectedAmenities to the required body format
      const requestBody = selectedAmenities.map((amenityId) => ({ id: amenityId }));

      const response = await axios.post('/filter/amenity', requestBody);
      setError(null);
      setDataArrayAmenity(response.data);
    } catch (error) {
      console.error('Error filtering by amenity:', error);
      setDataArrayAmenity([]);
      setError('Error filtering by amenity. Please try again.');
    }
  };

  useEffect(() => {
    fetchAmenityData();
  }, [selectedAmenitiesObjects]);


  useEffect(() => {
    const updatedAmenitiesObjects = selectedAmenities.map((id) => ({ id }));
    setSelectedAmenitiesObjects(updatedAmenitiesObjects);
  }, [selectedAmenities]);


  useEffect(() => {
    const fetchAmenities = async () => {
      try {
        const response = await axios.get('/amenity/get_all_accommodation_amenities');
        setAmenities(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching accommodation amenities:', error);
        setAmenities([]);
        setError('Error fetching accommodation amenities. Please try again.');
      }
    };

    // Fetch amenities when the component mounts
    fetchAmenities();
  }, []);

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

        setDataArrayPrice(response.data);
      } catch (error) {
        console.error('Error filtering by price:', error);
        setSearchResults([]);
        setError('Error filtering by price. Please try again.');
      }
    };

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`/filter/location/${location}`);
        setError('');

        setDataArrayLocation(response.data);
      } catch (error) {
        console.error('Error filtering by location:', error);
        setError('Error filtering by location. Please try again.');
      }
    };

    // Only fetch data if location is provided
    if (location) {
      fetchData();
    }
  }, [location]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`/filter/search/${searchHotelName}`);
        setError('');

        // Use setDataArray function to set the array with the items from the API response
        setDataArrayAccommodation(response.data);
      } catch (error) {
        console.error('Error searching accommodations:', error);
        setError('Error searching accommodations. Please try again.');
      }
    };

    // Only fetch data if searchHotelName is provided
    if (searchHotelName) {
      fetchData();
      console.log('searchHotelName', searchHotelName);
    }
  }, [searchHotelName]);



  const findArrayIntersection = (arrays) => {
    // Filter out empty arrays
    const nonEmptyArrays = arrays.filter((arr) => arr.length > 0);

    if (nonEmptyArrays.length === 0) {
      return [];
    }

    const [firstArray, ...restArrays] = nonEmptyArrays;

    return firstArray.filter((item) =>
      restArrays.every((array) => array.some((arrayItem) => arrayItem.id === item.id))
    );
  };

  useEffect(() => {
    const intersection = findArrayIntersection([dataArrayAccommodation, dataArrayLocation, dataArrayPrice, dataArrayAmenity]);
    setIntersection(intersection);
  }, [dataArrayAccommodation, dataArrayLocation, dataArrayPrice, dataArrayAmenity]);

  return (

    <div className="home-page-container">
      {console.log('dataAccommodation', dataArrayAccommodation)}
      {console.log('dataLocation', dataArrayLocation)}
      {console.log('dataPrice', dataArrayPrice)}
      {console.log('intersection', intersection)}
      {console.log('dataAmenity', dataArrayAmenity)}
      <section className="Banner">
        <div className="img-banner-container">
          <img src="https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?cs=srgb&dl=pexels-pixabay-258154.jpg&fm=jpg" alt="Banner" />
        </div>

        <div className="flex flex-col justify-center gap-40 search-box card">
          <div className="flex flex-col gap-16 gray-900">
            <h4>Bạn đang tìm khách sạn cho kỳ nghỉ của mình?</h4>
            <p>Chúng tôi có thể đem đến cho bạn những sự lựa chọn tuyệt vời nhất, những ưu đãi tốt nhất</p>
          </div>

          <div className="flex gap-20 align-center">
            <div className="input-container">
              <input type="text" placeholder="Nhập tên khách sạn" value={searchHotelName} onChange={handleChange} />
            </div>

            <div className="input-container">
              <input type="text" placeholder="Tất cả các địa điểm" value={location} onChange={handleLocationChange} />
            </div>

            <div className="input-container">
              <div className="flex gap-10">
                <input type="text" placeholder="Min Price" value={minPrice} onChange={handleMinPriceChange} />
                <input type="text" placeholder="Max Price" value={maxPrice} onChange={handleMaxPriceChange} />
              </div>
            </div>

            <div>
              <button className="flex align-center gap-24 search-button" onClick={handleSearch}>
                Tìm kiếm
              </button>
            </div>
          </div>
        </div>
      </section>
      <div>
        {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}

        <h3>Accommodation Amenities</h3>
        <ul>
          {amenities.map((amenity) => (
            <li key={amenity.id}>
              <label>
                <input
                  type="checkbox"
                  value={amenity.id}
                  checked={selectedAmenities.includes(amenity.id)}
                  onChange={() => handleCheckboxChange(amenity.id)}
                />
                {amenity.name}
                {/* {console.log('select', selectedAmenities)}
                {console.log('object', selectedAmenitiesObjects)} */}
              </label>
            </li>
          ))}
        </ul>

      </div>
      <section className="Popular-section">
        <div className="home-popular">
        </div>
      </section>
      <section className="Intersection-section">
        {intersection.length > 0 && (
          <div className="intersection-container">
            <h2>Kết quả tìm kiếm</h2>
            <ul>
              {intersection.map((item) => (
                <li key={item.id}>
                  <strong>Name:</strong>
                  <Link to={`/getaccommodation/${item.id}`}>{item.name}</Link>
                  <br />
                  <strong>Location:</strong> {item.location} <br />
                  <strong>Info:</strong> {item.info}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;

