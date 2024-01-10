// AccommodationItem.js
import React from 'react';
import { Link } from 'react-router-dom';

const AccommodationItem = ({ accommodation }) => {
  return (
    <li key={accommodation.id}>
      <strong>Name:</strong> {''}
      <Link to={`/getaccommodation/${accommodation.id}`}>{accommodation.name}</Link>
      <strong>Location:</strong> {accommodation.location}
      {accommodation.images && accommodation.images.length > 0 && (
        <div>
          <p>First Image:</p>
          <img
            src={accommodation.images[0]}
            alt={`First Image for accommodation ${accommodation.id}`}
            style={{ width: '600px', height: 'auto' }}
          />
        </div>
      )}
    </li>
  );
};

export default AccommodationItem;
