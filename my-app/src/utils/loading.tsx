import React from 'react';

const Loading: React.FC = () => {
  const containerStyle = {
    position: 'fixed' as 'fixed', // Use fixed to cover viewport
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    zIndex: 9999,
  };

  const imageStyle = {
    width: '150px',
    height: 'auto',
    animation: 'pulse 1.5s infinite ease-in-out',
  };

  return (
    <>
      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.05); opacity: 0.9; }
            100% { transform: scale(1); opacity: 1; }
          }
        `}
      </style>
      <div style={containerStyle}>
        <img src="PTC-logo.png" alt="Loading..." style={imageStyle} />
      </div>
    </>
  );
};

export default Loading;
