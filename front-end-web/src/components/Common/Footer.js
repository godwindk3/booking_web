import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <section className="Footer">
        <div className="flex justify-center main-footer">
          <div className="footer-container">
            {/* column1 */}
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

            {/* column2 */}
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
      </section>

    );    
};

export default Footer;