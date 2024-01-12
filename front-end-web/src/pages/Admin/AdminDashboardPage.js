import React from 'react';
import AdminPayment from './AdminPayment';
import AdminAmenity from './AdminAmenity';
const AdminDashboardPage = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      
      {/* Render other admin components as needed */}
      <AdminPayment />

      {/* Add more components as needed */}
      <AdminAmenity/>
    </div>
  );
};

export default AdminDashboardPage;
