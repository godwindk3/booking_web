import React, { useState } from 'react';
import axios from './axiosConfig';

import './ImageUploadButton.css'

const ImageUploadButton = ({ accommodationId }) => {
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

  return (
    <div className='upload-acco-image-button-container'>
      <input className='upload-acco-image-button file-input' type="file" onChange={handleImageChange} />
      <button className='upload-acco-image-button' onClick={handleImageUpload}>Upload Ảnh Khách Sạn</button>
    </div>
  );
};

export default ImageUploadButton;
