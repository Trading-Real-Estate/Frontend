import React from 'react';
import './open.css'; // Import CSS tùy chỉnh cho phần nền

const Background = ({ image }) => {
  return (
    <div className="background-container">
      <div className="background-image" style={{ backgroundImage: `url(${image})` }}>
        <div className="branding">
          <img className="logo" src="Batdongsan-logos_white.png" alt="Logo" />
          <p className='slogan' style={{width: '500px'}}>Easier & Safer </p>
        </div>
      </div>
    </div>
  );
};

export default Background;
