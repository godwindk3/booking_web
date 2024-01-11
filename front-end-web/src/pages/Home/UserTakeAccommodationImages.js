import React, { useState, useEffect } from 'react';
import axios from './axiosConfig';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import "./ImageAccommodation.css"

const UserTakeAccommodationImages = ({ accommodationId }) => {
  const [imageData, setImageData] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    const fetchImageUrls = async () => {
      try {
        // Fetch image data based on accommodation ID
        const response = await axios.get(`/image/accommodation/get_accommodation_images/${accommodationId}`);
        const imagesData = response.data;

        // Set image data
        setImageData(imagesData);

        // Fetch and set image URLs
        const individualImages = await Promise.all(
          imagesData.map(async (image) => {
            try {
              const individualImageResponse = await axios.get(`/image/accommodation/get_image/${image.id}`, {
                responseType: 'arraybuffer',
              });
              const imageBlob = new Blob([individualImageResponse.data], { type: 'image/jpeg' });
              const imageUrl = URL.createObjectURL(imageBlob);
              return imageUrl;
            } catch (error) {
              console.error('Error fetching individual image:', error);
              return null;
            }
          })
        );

        setImageUrls(individualImages);
      } catch (error) {
        console.error('Error fetching image data:', error.message);
      }
    };

    fetchImageUrls();
  }, [accommodationId]);


  const PrevArrow = (props) => (
    <button {...props} className="slider-arrow slider-arrow-prev">
      <div class="arrow-left"></div>
    </button>
  );
  const NextArrow = (props) => (
    <button {...props} className="slider-arrow slider-arrow-next">
      <div class="arrow-right"></div>
    </button>
  );
  const settings = {
    dots: true, // Hiển thị các chấm chỉ số ở dưới slider
    infinite: true, // Vô hạn quay lại các ảnh khi chạm đến cuối cùng
    speed: 500, // Tốc độ chuyển đổi giữa các ảnh (ms)
    slidesToShow: 1, // Số lượng ảnh hiển thị trên mỗi trang
    slidesToScroll: 1, // Số lượng ảnh được chuyển đổi khi trượt slider   
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <div>
      {/* <h2 className='h2-view-image-acco-header'>Ảnh khách sạn</h2> */}
     
      <Slider {...settings} className='slider-container'>
        {imageUrls.map((imageUrl, index) => (
          <div key={index}>
            <img className='slider-container-img'
              src={imageUrl}
              alt={`Accommodation Image ${index + 1}`}
            />
          </div>
        ))}
      </Slider>

    </div>
  );
};

export default UserTakeAccommodationImages;

