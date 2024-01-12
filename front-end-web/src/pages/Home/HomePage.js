// components/pages/HomePage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import './HomePage.css'; // Import your stylesheet if needed

const HomePage = () => {
  const [searchHotelName, setHotelName] = useState('');
  const handleChange = (event) => {
    setHotelName(event.target.value);
  }; 

  const [location, setLocation] = useState('');
  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const [priceRange, setPriceRange] = useState('');
  const handlePriceRangeChange = (event) => {
    setPriceRange(event.target.value);
  };

  return (
    <div className="home-page-container">
      <section className="Banner">
        <div className="img-banner-container">
          <img src="https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?cs=srgb&dl=pexels-pixabay-258154.jpg&fm=jpg"/>
        </div>

        <div className="flex flex-col justify-center gap-40 search-box card">
          <div className="flex flex-col gap-16 gray-900">
            <h4>Bạn đang tìm khách sạn cho kỳ nghỉ của mình?</h4>
            <p>Chúng tôi có thể đem đến cho bạn những sự lựa chọn tuyệt vời nhất, những ưu đãi tốt nhất</p>
          </div>

          <div className="flex gap-20 align-center">
            <div className="input-container">
              <input type="text" placeholder="Nhập tên khách sạn" value={searchHotelName} onChange={handleChange}/>
            </div>

            <div className="select-location-button">
              <select value={location} onChange={handleLocationChange}>
                <option value="">Tất cả các địa điểm</option>
                <option value="Hà Nội">Hà Nội</option>
                <option value="Đà Nẵng">Đà Nẵng</option>
                <option value="TP.HCM">TP.HCM</option>
              </select>
            </div>

            <div className="select-location-button">
              <select value={priceRange} onChange={handlePriceRangeChange}>
                <option value="">Tất cả các mức giá</option>
                <option value="Dưới 2 triệu">Dưới 2 triệu</option>
                <option value="Từ 2 - 5 triệu">Từ 2 - 5 triệu</option>
                <option value="Từ 5 triệu trở lên">Từ 5 triệu trở lên</option>
              </select>
            </div>
            
            <div>
              <button className="flex align-center gap-24 search-button">
                Tìm kiếm
              </button>
            </div>
          </div>

        </div>
      </section>

      <section className="Popular-section">
        <div className="home-popular">

        </div>

      </section>

      {/* <section className="Footer">
        <div className="flex justify-center main-footer">
          <div className="footer-container">

            <div className="flex flex-col gap-20">
              <div>
                <booking>Booking</booking>
                <vn>.vn</vn>
              </div>

              <div className="footer1-list">
                Công ty TNHH Du Lịch và Dịch Vụ Booking.vn
                <br/>
                <br/>
                334 Nguyễn Trãi, Thanh Xuân, Hà Nội
              </div>
            </div>


            <div className="flex justify-between gap-16 footer2">
              <div className="flex flex-col gap-16">
                <div className="footer2-head">Giới thiệu</div>
                <div className="flex flex-col gap-16">
                  <a href="/about" style={{ textDecoration: 'none' }} className="footer2-list">Về chúng tôi</a>
                  <a href="/about" style={{ textDecoration: 'none' }} className="footer2-list">Quy định chung và lưu ý</a>
                  <a href="/about" style={{ textDecoration: 'none' }} className="footer2-list">Câu hỏi thường gặp</a>
                </div>
              </div>

              <div className="flex flex-col gap-16">
                <div className="footer2-head">Liên hệ</div>
                <div className="flex flex-col gap-16">
                  <a href="https://www.facebook.com/noobcantnotdie" style={{ textDecoration: 'none' }} className="footer2-list">Facebook</a>
                  <a href="https://www.instagram.com/an.bish192/" style={{ textDecoration: 'none' }} className="footer2-list">Instagram</a>
                  <div>Email: info@bookingvn.com</div>
                  <div>Hotline: 0988888888</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center main-footer">
          <div className="footer-container">
            <p> &copy; 2023 Booking.vn | All rights reserved </p>
          </div>
        </div>
      </section> */}

    </div>
  );
};

export default HomePage;
