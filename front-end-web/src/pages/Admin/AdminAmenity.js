import React from 'react';
import AdminRoomAmenity from './AdminRoomAmenity';
import AdminAccommodationAmenity from './AdminAccommodationAmenity';

const AdminAmenity = () => {
  return (
    <div>
      <h1>Admin Amenity Dashboard</h1>

      <div>
        <h2>Room Amenities</h2>
        <AdminRoomAmenity />
      </div>

      <div>
        <h2>Accommodation Amenities</h2>
        <AdminAccommodationAmenity />
      </div>
    </div>
  );
};

export default AdminAmenity;
