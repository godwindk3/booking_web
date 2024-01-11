import React from 'react';
import './Popup.css'; // You may want to style your popup using CSS

const Popup = ({ onClose, children }) => {
  return (
    <div className="popup-container">
      <div className="popup">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Popup;
