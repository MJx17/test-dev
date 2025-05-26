import React from 'react';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import '../styles/loans.scss';

const LoanPage: React.FC = () => {
  return (
    <div className="loan-page-2">
      <div className="loan-section-2">
        <div className="loan-text-2-header">
          <h1>Loans</h1>
          <p className="loan-description-2">
            Choose from a range of loan options tailored to your needs. Whether you're looking to finance your home, car, education, or personal goals, we’ve got a plan that fits your budget.
          </p>
        </div>
        <div className="loan-banner-2">
          <button className="button-banner-2">Click Me</button>
        </div>
      </div>

      <div className='loan-card-con-2'>
        <h1 className='loan-title-2'>Start your journey here</h1>
        <div className="button-group-2">
          {['Personal Loan', 'Home Loan', 'Car Loan', 'Education Loan'].map((loan) => (
            <div className="loan-card-2" key={loan}>
              <div className="loan-image-2">
                <img src="/12.jpg" alt="Loan banner" />
              </div>
              <div className="loan-text-2">
                {loan}
                <ArrowCircleRightIcon />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoanPage;
