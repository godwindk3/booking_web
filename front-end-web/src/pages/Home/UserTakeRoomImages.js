import React, { useState, useEffect } from 'react';
import axios from './axiosConfig';

const UserTakeRoomImages = ({ roomId }) => {
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


  return (
    <div>

      {imageUrls.map((imageUrl, index) => (
        <div key={index}>
          <img
            src={imageUrl}
            alt={`Accommodation Image ${index + 1}`}
            style={{ width: '300px', height: 'auto' }}
          />
        </div>
      ))}
    </div>
  );
};

export default UserTakeRoomImages;

