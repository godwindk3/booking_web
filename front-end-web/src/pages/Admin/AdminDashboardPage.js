import React from 'react';
import AdminPayment from './AdminPayment';
import AdminAmenity from './AdminAmenity';
const AdminDashboardPage = () => {
  return (
    <div>
      <h2 className='h2-header'>ADMIN</h2>

      <div >
        <AdminAmenity/>
      </div>

      <div className="create-hotel-card">
        <AdminPayment />
      </div>

    </div>
  );
};

export default AdminDashboardPage;
