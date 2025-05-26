import React from 'react';
import '../styles/atm.scss'; // Import SCSS file for styling

const AtmCard: React.FC = () => {
  return (
    <div className="atm-card-container">
      <div className="atm-card">
        {/* Card Top */}
        <div className="atm-card-top">
          <div className="atm-card-logo">
            <img
              src="/logo.png" 
              alt="Card Brand Logo" 
              className="card-logo"
              style={{background: "white", borderRadius: '50%'}}
            />
          </div>
          <div className="atm-card-chip">
            <img
              src="https://img.icons8.com/?size=100&id=30435&format=png&color=000000"
              style={{height: '40px', width:'40px'}}
              alt="EMV Chip"
              className="chip"
            />
          </div>
        </div>

        {/* Card Number */}
        <div className="atm-card-number">
          <span>**** **** **** 1234</span>
        </div>

        {/* Cardholder's Name */}
        <div className="atm-card-name">
          <span>JOHN DOE</span>
        </div>

        {/* Expiry Date */}
        <div className="atm-card-expiry">
          <span>Exp: 12/25</span>
        </div>
      </div>
    </div>
  );
};

export default AtmCard;
