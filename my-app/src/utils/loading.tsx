import React from 'react';
import { PacmanLoader } from 'react-spinners';

const Loading: React.FC = () => {
  // Inline styles for the loading container
  const containerStyle = {
    position: 'absolute' as 'absolute', // Overlay on top
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background
    zIndex: 9999, // Make sure it's above other content
  };

  return (
    <div style={containerStyle}>
      <PacmanLoader color="#FFFF00" size={150}/>
    </div>
  );
};

export default Loading;
