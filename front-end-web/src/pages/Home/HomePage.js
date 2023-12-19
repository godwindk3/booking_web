// components/pages/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; // Import your stylesheet if needed

const HomePage = () => {
  return (
    <div className="home-page-container">
      <header className="header">
        <h1>Welcome to Booking</h1>
      </header>

      <section className="main-content">
        <p>Nhom 15</p>
        <p>Feel free to customize and add more content.</p>

        <div className="cta-buttons">
          <Link to="/about" className="cta-button">
            Learn More
          </Link>
          <Link to="/contact" className="cta-button">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
