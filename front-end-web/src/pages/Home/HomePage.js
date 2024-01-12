// // components/pages/HomePage.js
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { NavLink } from 'react-router-dom';
// import './HomePage.css'; // Import your stylesheet if needed

// const HomePage = () => {
//   const [searchHotelName, setHotelName] = useState('');
//   const handleChange = (event) => {
//     setHotelName(event.target.value);
//   }; 

//   const [location, setLocation] = useState('');
//   const handleLocationChange = (event) => {
//     setLocation(event.target.value);
//   };

//   const [priceRange, setPriceRange] = useState('');
//   const handlePriceRangeChange = (event) => {
//     setPriceRange(event.target.value);
//   };

//   return (
//     <div className="home-page-container">
//       <section className="Banner">
//         <div className="img-banner-container">
//           <img src="https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?cs=srgb&dl=pexels-pixabay-258154.jpg&fm=jpg"/>
//         </div>

//         <div className="flex flex-col justify-center gap-40 search-box card">
//           <div className="flex flex-col gap-16 gray-900">
//             <h4>Bạn đang tìm khách sạn cho kỳ nghỉ của mình?</h4>
//             <p>Chúng tôi có thể đem đến cho bạn những sự lựa chọn tuyệt vời nhất, những ưu đãi tốt nhất</p>
//           </div>

//           <div className="flex gap-20 align-center">
//             <div className="input-container">
//               <input type="text" placeholder="Nhập tên khách sạn" value={searchHotelName} onChange={handleChange}/>
//             </div>

//             <div className="select-location-button">
//               <select value={location} onChange={handleLocationChange}>
//                 <option value="">Tất cả các địa điểm</option>
//                 <option value="Hà Nội">Hà Nội</option>
//                 <option value="Đà Nẵng">Đà Nẵng</option>
//                 <option value="TP.HCM">TP.HCM</option>
//               </select>
//             </div>

//             <div className="select-location-button">
//               <select value={priceRange} onChange={handlePriceRangeChange}>
//                 <option value="">Tất cả các mức giá</option>
//                 <option value="Dưới 2 triệu">Dưới 2 triệu</option>
//                 <option value="Từ 2 - 5 triệu">Từ 2 - 5 triệu</option>
//                 <option value="Từ 5 triệu trở lên">Từ 5 triệu trở lên</option>
//               </select>
//             </div>
            
//             <div>
//               <button className="flex align-center gap-24 search-button">
//                 Tìm kiếm
//               </button>
//             </div>
//           </div>

//         </div>
//       </section>

//       <section className="Popular-section">
//         <div className="home-popular">

//         </div>

//       </section>
//     </div>
//   );
// };

// export default HomePage;
import React, { useState } from 'react';
import './HomePage.css'; // Import your stylesheet if needed
import FilterAccommodation from './FilterAccommodation';
import FilterLocation from './FilterLocation';
import FilterPrice from './FilterPrice';

const HomePage = () => {
  const [searchHotelName, setHotelName] = useState('');
  const handleChange = (event) => {
    setHotelName(event.target.value);
  };

  const [location, setLocation] = useState('');
  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value);
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
  };

  const handleSearch = () => {
    // Pass searchHotelName, location, minPrice, and maxPrice to the child component or perform other actions
    console.log("Search Hotel Name:", searchHotelName);
    console.log("Location:", location);
    console.log("Min Price:", minPrice);
    console.log("Max Price:", maxPrice);
  };

  return (
    <div className="home-page-container">
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

      <section className="Popular-section">
        <div className="home-popular">
          {/* ... your existing code ... */}
        </div>
      </section>
      <FilterAccommodation accommodationId={searchHotelName}/>
      <FilterLocation location={location}/>
      <FilterPrice maxPrice={maxPrice} minPrice={minPrice}/>
    </div>
  );
};

export default HomePage;
