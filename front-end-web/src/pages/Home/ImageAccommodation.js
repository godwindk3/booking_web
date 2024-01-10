import React, { useState, useEffect } from 'react';
import axios from './axiosConfig';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import "./ImageAccommodation.css"

const ImageAccommodation = ({ accommodationId }) => {
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

  const deleteImage = async (imageId) => {
    try {
      // Get the token from local storage
      const token = localStorage.getItem('token');

      // Make a DELETE request to delete the image
      await axios.delete(`/image/accommodation/${imageId}`, {
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

  /////////////////////////////////////////////////////////////////////////////////////////////// image upload button .js
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
        `image/accommodation/upload/${accommodationId}`,
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
    } catch (error) {
      console.error('Error uploading image:', error.message);
    }
  };
  /////////////////////////////////////////////////////////////////////////////////////////////// image upload button .js

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
      <h2 className='h2-view-image-acco-header'>Ảnh khách sạn</h2>
     
      <Slider {...settings} className='slider-container'>
        {imageUrls.map((imageUrl, index) => (
          <div key={index}>
            <img className='slider-container-img'
              src={imageUrl}
              alt={`Accommodation Image ${index + 1}`}
            />
            <button className='delete-image-button' onClick={() => deleteImage(imageData[index].id)}>Xoá Ảnh Này</button>
          </div>
        ))}

        <div> 
          <label for="images" class="drop-container" id="dropcontainer">
            <span class="drop-title">Thêm ảnh tại đây</span>

            <input className='acco-image-file-input' type="file" onChange={handleImageChange} id="images" accept="image/*" required/>
          </label>
          
          <button className='upload-acco-image-button' onClick={handleImageUpload}>Upload Ảnh Khách Sạn</button>
        </div>
      </Slider>

    </div>
  );
};

export default ImageAccommodation;

