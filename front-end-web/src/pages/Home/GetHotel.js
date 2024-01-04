
import React, { useState, useEffect } from 'react';
import axios from './axiosConfig';
// import Modal from 'react-modal';

const GetHotel = () => {
    const [hotels, setHotels] = useState([]);
    const [error, setError] = useState(null);
    const [selectedHotelId, setSelectedHotelId] = useState(null);
    const [rooms, setRooms] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/accommodation');
                setHotels(response.data);
            } catch (error) {
                console.error('Error fetching hotel data:', error);
                setError('Error fetching hotel data. Please try again.');
            }
        };

        fetchData();
    }, []);

    const fetchRoomsForHotel = async (hotelId) => {
        try {
            const response = await axios.get(`/accommodation/${hotelId}/rooms`);
            setRooms(response.data);
            setIsModalOpen(true); // Open the modal after fetching rooms
        } catch (error) {
            console.error('Error fetching rooms for hotel:', error);
            setError('Error fetching rooms for hotel. Please try again.');
        }
    };

    const handleHotelClick = (hotelId) => {
        setSelectedHotelId(hotelId);
        fetchRoomsForHotel(hotelId);
    };

   

    return (
        <div>
            <h2>Thông Tin Khách Sạn</h2>
            {error && <p>{error}</p>}
            <ul>
                {hotels.map((hotel) => (
                    <li key={hotel.id} onClick={() => handleHotelClick(hotel.id)} style={{ cursor: 'pointer' }}>
                        <strong>Tên Khách Sạn:</strong> {hotel.name}, <strong>Địa Điểm:</strong> {hotel.location}
                    </li>
                ))}
            </ul>

          
        </div>
    );
};

export default GetHotel;
