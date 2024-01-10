import React, { useState, useEffect } from 'react';
import axios from './axiosConfig';
import RoomAmenityDetachButton from './RoomAmenityDetachButton';
import RoomAmenityButton from './RoomAmenityButton';
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
            <h3>Room Amenities:</h3>
            {loading && <p>Loading amenities...</p>}
            {!loading && amenities.length === 0 && <p>No amenities available for this room.</p>}
            {!loading && amenities.length > 0 && (
                <ul>
                    {amenities.map((amenity) => (
                        <li key={amenity.id}>{amenity.name}
                            <>
                                <RoomAmenityDetachButton roomId={roomId} amenityId={amenity.id} />
                            </>
                        </li>
                    ))}
                </ul>
            )}

            <>
            <RoomAmenityButton roomId={roomId}/>
            </>
        </div>
    );
};

export default RoomAmenity;
