import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.scss'; // or create NotFound.scss if preferred

const NotFound404: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="unauthorized-container">
      <h1 className="heading">404 - Page Not Found</h1>
      <p className="paragraph">The page you are looking for does not exist.</p>
      <button className="back-home-button" onClick={() => navigate('/')}>
        Go Back Home
      </button>
    </div>
  );
};

export default NotFound404;
