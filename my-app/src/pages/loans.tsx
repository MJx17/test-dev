

import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import SchoolIcon from '@mui/icons-material/School';
import SettingsAccessibilityIcon from '@mui/icons-material/SettingsAccessibility';
import '../styles/loans.scss';

const LoanPage: React.FC = () => {
  return (
    <div className="loan-page">

      <div className="loan-section">


        <div className="loan-text">
          <h1>Loans</h1>

          <p className="loan-description">
            Choose from a range of loan options tailored to your needs. Whether you're looking to finance your home, car, education, or personal goals, we’ve got a plan that fits your budget.
          </p>
        </div>
        <div className="loan-banner">
          <img src="/12.jpg" alt="Loan banner" />
        </div>


      </div>


      <div className="button-group">
        <div className="loan-card">
          <SettingsAccessibilityIcon sx={{ fill: 'white' }} />
          Personal Loan
        </div>
        <div className="loan-card">
          <HomeIcon />
          Home Loan
        </div>
        <div className="loan-card">
          <DirectionsCarIcon />
          Car Loan
        </div>
        <div className="loan-card">
          <SchoolIcon />
          Education Loan
        </div>
      </div>
    </div >
  );
};

export default LoanPage;


