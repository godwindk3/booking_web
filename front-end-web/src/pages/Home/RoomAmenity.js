import React, { useState, useEffect } from 'react';
import axios from './axiosConfig';
import RoomAmenityDetachButton from './RoomAmenityDetachButton';
import RoomAmenityButton from './RoomAmenityButton';

import './RoomAmenity.css';

const RoomAmenity = ({ roomId }) => {
    const [amenities, setAmenities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRoomAmenities = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`/amenity/get_room_amenities/${roomId}`);
                setAmenities(response.data);
            } catch (error) {
                console.error('Error fetching room amenities:', error.message);
            } finally {
                setLoading(false);
            }
        };

        if (roomId) {
            fetchRoomAmenities();
        }
    }, [roomId]);

    return (
        <div>
            <p>Nhấn vào nút x để xoá tiện ích tương ứng</p>

            {loading && <p>Loading amenities...</p>}
            {!loading && amenities.length === 0 && <p>Chưa có tiện ích</p>}

            <div className='your-hotel-amenity-list'>
                {!loading && amenities.length > 0 && (
                    <ul className='your-hotel-amenity-list-ul'>
                        {amenities.map((amenity) => (
                            <li className='your-hotel-amenity-list-li' key={amenity.id}>{amenity.name}
                                <div className="your-hotel-amenity-item">
                                    <RoomAmenityDetachButton roomId={roomId} amenityId={amenity.id} />
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <>
            <RoomAmenityButton roomId={roomId}/>
            </>
        </div>
    );
};

export default RoomAmenity;
