
import React, { useState, useEffect } from 'react';
import axios from './axiosConfig';
import Modal from 'react-modal';

const GetHotel = () => {
    const [hotels, setHotels] = useState([]);
    const [error, setError] = useState(null);
    const [selectedHotelId, setSelectedHotelId] = useState(null);
    const [rooms, setRooms] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/admin/accommodations');
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
            const response = await axios.get(`/admin/accommodations/${hotelId}/rooms`);
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

    const closeModal = () => {
        setIsModalOpen(false);
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

            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Room Information"
            >
                <h2>Thông Tin Phòng Khách Sạn</h2>
                {selectedHotelId && (
                    <>
                        <p>Thông tin phòng cho khách sạn (ID: {selectedHotelId}):</p>
                        <ul>
                            {rooms.map((room) => (
                                <li key={room.id}>
                                    <strong>Số Phòng:</strong> {room.room_number},{' '}
                                    <strong>Thể Tích:</strong> {room.capacity},{' '}
                                    <strong>Giá:</strong> {room.price},{' '}
                                    <strong>Trạng Thái:</strong> {room.status ? 'Sẵn Sàng' : 'Đã có người đặt'},{' '}
                                    <strong>Loại phòng:</strong> {room.tier}
                                </li>
                            ))}
                        </ul>
                    </>
                )}
                <button onClick={closeModal}>Đóng</button>
            </Modal>
        </div>
    );
};

export default GetHotel;
