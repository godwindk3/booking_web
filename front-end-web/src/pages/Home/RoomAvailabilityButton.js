import React, { useState } from 'react';
import axios from './axiosConfig';

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
            const formattedCheckinDate = new Date(checkinDate).toISOString().split('T')[0];
            const formattedCheckoutDate = new Date(checkoutDate).toISOString().split('T')[0];

            const response = await axios({
                method: 'get',
                url: `/room/get_available_rooms/${accommodationId}`,
                data: {
                    checkin_date: formattedCheckinDate,
                    checkout_date: formattedCheckoutDate,
                },
            });

            setAvailableRooms(response.data);
        } catch (error) {
            console.log(checkinDate);
            console.log(checkoutDate);
            console.log(accommodationId);
            console.error('Error fetching available rooms:', error);
        }
    };


    return (
        <>
            <button onClick={handleButtonClick}>Check Room Availability</button>
            {isPopupOpen && (
                <div className="popup-container">
                    <div className="popup-content">
                        <label htmlFor="checkin-date">Check-in Date:</label>
                        <input
                            type="date"
                            id="checkin-date"
                            value={checkinDate}
                            onChange={(e) => setCheckinDate(e.target.value)}
                        />

                        <label htmlFor="checkout-date">Check-out Date:</label>
                        <input
                            type="date"
                            id="checkout-date"
                            value={checkoutDate}
                            onChange={(e) => setCheckoutDate(e.target.value)}
                        />

                        <button onClick={handleFindButtonClick}>Find</button>

                        {/* Display the available rooms */}
                        {availableRooms.map((room) => (
                            <div key={room.id}>
                                <p>{room.room_name}</p>
                                <p>{room.info}</p>
                                {/* Add other details as needed */}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default RoomAvailabilityButton;
