import React, { useState } from 'react';
import axios from './axiosConfig';
import UserTakeRooms from './UserTakeRooms';

import UserTakeRoomImages from './UserTakeRoomImages';
import RoomDetailsButton2 from './RoomDetailsButton2';

import './RoomAvailabilityButton.css';

const RoomAvailabilityButton = ({ accommodationId }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [checkinDate, setCheckinDate] = useState('');
    const [checkoutDate, setCheckoutDate] = useState('');
    const [availableRooms, setAvailableRooms] = useState([]);

    const handleButtonClick = () => {
        setIsPopupOpen(true);
    };

    const handleFindButtonClick = async () => {
        try {
            // Convert dates to "year-month-day" format
            const formattedCheckinDate = new Date(checkinDate).toISOString().split('T')[0];
            const formattedCheckoutDate = new Date(checkoutDate).toISOString().split('T')[0];

            const response = await axios.post(`/room/get_available_rooms/${accommodationId}`, {
                checkin_date: formattedCheckinDate,
                checkout_date: formattedCheckoutDate,
            });

            setAvailableRooms(response.data);
        } catch (error) {
            console.log(checkinDate);
            console.log(checkoutDate);
            console.log(accommodationId);
            console.error('Error fetching available rooms:', error);
        }
    };

    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
    };

    return (
        <>
            {/* <button className='find-room-by-date-button' onClick={togglePopup}>Tìm phòng trống theo ngày</button>
            {isPopupOpen && ( */}

                <div className="find-room-by-date-card">
                    <div className="find-room-by-date-searchbox">

                        <div className="popup-content">
                            <label htmlFor="checkin-date">Ngày Check-in </label>
                            <input
                                type="date"
                                id="checkin-date"
                                value={checkinDate}
                                onChange={(e) => setCheckinDate(e.target.value)}
                            />
                        </div>

                        <div className="popup-content">
                            <label htmlFor="checkout-date">Ngày Check-out </label>
                            <input
                                type="date"
                                id="checkout-date"
                                value={checkoutDate}
                                onChange={(e) => setCheckoutDate(e.target.value)}
                            />
                        </div>

                        <div className="popup-content">
                            <button className='find-room-by-date-search-button' onClick={handleFindButtonClick}>Tìm kiếm</button>

                            {/* Display the available rooms */}
                            {availableRooms.map((room) => (
                                <div key={room.id}>
                                {/* <UserTakeRoomImages roomId={room.id}/> */}
                                    <RoomDetailsButton2 roomId={room.id} accommodationId={accommodationId}/>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                
            {/* )} */}
        </>
    );
};

export default RoomAvailabilityButton;
