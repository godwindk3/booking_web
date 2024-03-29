// AccommodationItem.js
import React from 'react';
import { Link } from 'react-router-dom';

import './AccommodationItem.css';
import GetPriceAccommodation from './GetPriceAccommodation';


const AccommodationItem = ({ accommodation }) => {
  return (
    // <li key={accommodation.id}>
    //   <strong>Name:</strong> {''}
    //   <Link to={`/getaccommodation/${accommodation.id}`}>{accommodation.name}</Link>
    //   <strong>Location:</strong> {accommodation.location}
    //   {accommodation.images && accommodation.images.length > 0 && (
    //     <div>
    //       <p>First Image:</p>
    //       <img
    //         src={accommodation.images[0]}
    //         alt={`First Image for accommodation ${accommodation.id}`}
    //         style={{ width: '600px', height: 'auto' }}
    //       />
    //     </div>
    //   )}
    // </li>

    <div className='accommodation-list-container'>
      <div className='accommodation-card'>
        <Link to={`/getaccommodation/${accommodation.id}`} className='accommodation-container'>
          <div>
            {accommodation.images && accommodation.images.length > 0 && (
              <div className='acco-img-container'>
                <img className='acco-img'
                  src={accommodation.images[0]}
                  alt={`First Image for accommodation ${accommodation.id}`}
                />
              </div>  
            )}
          </div>

          <div className='acco-content-container'>
            <div>
              <h4 className='acco-name'> {accommodation.name} </h4>
              <br/>
              <div className='acco-location'> {accommodation.location} </div>
            </div>

          

          <div className='acco-content-container-price'>
            <hr className='accomodationitem-hr-hr-hr'/>
           <span><GetPriceAccommodation accommodationId={accommodation.id}/></span>
          </div>

          </div>
        </Link>
      </div>        
    </div>
  );
};

export default AccommodationItem;
