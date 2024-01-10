// import React, { useState, useEffect } from 'react';
// import axios from './axiosConfig';
// import { Link } from 'react-router-dom';

// const GetAccommodation = () => {
//   const [accommodations, setAccommodations] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('/accommodation');
//         const accommodationsData = response.data;

//         // Fetch images for each accommodation
//         const accommodationsWithImages = await Promise.all(
//           accommodationsData.map(async (accommodation) => {
//             try {
//               const imagesResponse = await axios.get(`/image/accommodation/get_accommodation_images/${accommodation.id}`);
//               const imagesData = imagesResponse.data;

//               // Fetch individual images using image IDs
//               const individualImages = await Promise.all(
//                 imagesData.map(async (image) => {
//                   try {
//                     const individualImageResponse = await axios.get(`/image/accommodation/get_image/${image.id}`, { responseType: 'arraybuffer' });
//                     const imageBlob = new Blob([individualImageResponse.data], { type: 'image/jpeg' }); // Adjust the MIME type if needed
//                     const imageUrl = URL.createObjectURL(imageBlob);
//                     console.log(imageUrl)
//                     return imageUrl;
//                   } catch (error) {
//                     console.error('Error fetching individual image:', error);
//                     return null;
//                   }
//                 })
//               );

//               return { ...accommodation, images: individualImages };
//             } catch (error) {
//               console.error('Error fetching images for accommodation:', error);
//               return { ...accommodation, images: [] };
//             }
//           })
//         );

//         setAccommodations(accommodationsWithImages);
//       } catch (error) {
//         console.error('Error fetching accommodation data:', error);
//         setError('Error fetching accommodation data. Please try again.');
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div>
//       <h2>Danh sách khách sạn</h2>
//       {error && <p>{error}</p>}
//       <ul>
//         {accommodations.map((accommodation) => (
//           <li key={accommodation.id}>
//             <strong>Name:</strong> {''},<Link to={`/accommodation/${accommodation.id}`}>{accommodation.name}</Link>
//             <strong>Location:</strong> {accommodation.location}
//             {accommodation.images && (
//               <ul>
//                 {accommodation.images.map((imageUrl, index) => (
//                   <li key={index}>
//                     <img
//                       src={imageUrl}
//                       alt={`Individual Image ${index + 1} for accommodation ${accommodation.id}`}
//                       style={{ width: '600px', height: 'auto' }} // Adjust the width and height as needed
//                     />
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default GetAccommodation;

// GetAccommodation.js
import React, { useState, useEffect } from 'react';
import axios from './axiosConfig';
import AccommodationItem from './AccommodationItem';

const GetAccommodation = () => {
  const [accommodations, setAccommodations] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/accommodation');
        const accommodationsData = response.data;

        // Fetch images for each accommodation
        const accommodationsWithImages = await Promise.all(
          accommodationsData.map(async (accommodation) => {
            try {
              const imagesResponse = await axios.get(`/image/accommodation/get_accommodation_images/${accommodation.id}`);
              const imagesData = imagesResponse.data;

              // Fetch individual images using image IDs
              const individualImages = await Promise.all(
                imagesData.map(async (image) => {
                  try {
                    const individualImageResponse = await axios.get(`/image/accommodation/get_image/${image.id}`, { responseType: 'arraybuffer' });
                    const imageBlob = new Blob([individualImageResponse.data], { type: 'image/jpeg' });
                    const imageUrl = URL.createObjectURL(imageBlob);
                    return imageUrl;
                  } catch (error) {
                    console.error('Error fetching individual image:', error);
                    return null;
                  }
                })
              );

              return { ...accommodation, images: individualImages };
            } catch (error) {
              console.error('Error fetching images for accommodation:', error);
              return { ...accommodation, images: [] };
            }
          })
        );

        setAccommodations(accommodationsWithImages);
      } catch (error) {
        console.error('Error fetching accommodation data:', error);
        setError('Error fetching accommodation data. Please try again.');
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Danh sách khách sạn</h2>
      {error && <p>{error}</p>}
      <ul>
        {accommodations.map((accommodation) => (
          <AccommodationItem key={accommodation.id} accommodation={accommodation} />
        ))}
      </ul>
    </div>
  );
};

export default GetAccommodation;
