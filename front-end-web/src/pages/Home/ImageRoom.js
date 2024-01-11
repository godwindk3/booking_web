import React, { useState, useEffect } from 'react';
import axios from './axiosConfig';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './ImageRoom.css';

const ImageRoom = ({ roomId, onButtonClick }) => {
  const [imageData, setImageData] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    const fetchImageUrls = async () => {
      try {
        // Fetch image data based on accommodation ID
        const response = await axios.get(`/image/room/get_room_images/${roomId}`);
        const imagesData = response.data;

        // Set image data
        setImageData(imagesData);

        // Fetch and set image URLs
        const individualImages = await Promise.all(
          imagesData.map(async (image) => {
            try {
              const individualImageResponse = await axios.get(`/image/room/get_image/${image.id}`, {
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
  }, [roomId]);

  const deleteImage = async (imageId) => {
    try {
      // Get the token from local storage
      const token = localStorage.getItem('token');

      // Make a DELETE request to delete the image
      await axios.delete(`/image/room/${imageId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // After successful deletion, update both image data and URLs
      setImageData((prevImageData) => prevImageData.filter((image) => image.id !== imageId));
      setImageUrls((prevImageUrls) => prevImageUrls.filter((url, index) => imageData[index].id !== imageId));
    } catch (error) {
      console.error('Error deleting image:', error.message);
    }
  };

  /////////////////////////////////////////////////////////////////////////////////////////////// image room upload.js
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
      const file = event.target.files[0];
      setSelectedImage(file);
  };

  const handleImageUpload = async () => {
      try {
          // Check if an image is selected
          if (!selectedImage) {
              console.error('No image selected for upload.');
              return;
          }

          // Get the token from local storage
          const token = localStorage.getItem('token');

          // Create a FormData object to send the image file
          const formData = new FormData();
          formData.append('file', selectedImage);

          // Make a POST request to upload the image
          const response = await axios.post(
              `/image/room/upload/${roomId}`,
              formData,
              {
                  headers: {
                      Authorization: `Bearer ${token}`,
                      'Content-Type': 'multipart/form-data',
                  },
              }
          );

          console.log('Image upload successful. Response:', response.data);
          alert('Image upload successful')
          // Reset the selected image
          setSelectedImage(null);

          // Call the onButtonClick function after successful upload
          if (onButtonClick) {
              onButtonClick();
          }
      } catch (error) {
          console.error('Error uploading image:', error.message);
      }
  };
  /////////////////////////////////////////////////////////////////////////////////////////////// image room upload.js

  const PrevArrow = (props) => (
    <button {...props} className="slider-arrow-room slider-arrow-prev">
      <div class="arrow-left"></div>
    </button>
  );
  const NextArrow = (props) => (
    <button {...props} className="slider-arrow-room slider-arrow-next">
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
      <Slider {...settings} className='room-slider-container'>
        {imageUrls.map((imageUrl, index) => (
          <div key={index}>
            <img className='slider-container-room-img'
              src={imageUrl}
              alt={`Accommodation Image ${index + 1}`}
            />
            <button className='delete-room-image-button' onClick={() => deleteImage(imageData[index].id)}>Xoá ảnh này</button>
          </div>
        ))}

        <div>
          <label for="image" className="drop-container-room" id="dropcontainer-room">
            <span className="drop-title-room">Thêm ảnh tại đây</span>
            <input className='room-image-file-input' type="file" onChange={handleImageChange} id="image" accept="image/*" required />
          </label>

          <button className='add-room-image-button' onClick={handleImageUpload}>Tải ảnh lên</button>
        </div>

      </Slider>
    </div>
  );
};

export default ImageRoom;

