import React, { ReactNode } from 'react';
import Navbar from '../components/navbar';  // Assuming Navbar is your public navbar component
import '../styles/layout.scss';      // Optional, for any styles you'd like to add

interface PublicLayoutProps {
  children: ReactNode; // Children are the components that will be rendered inside this layout
}

const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  return (
    <div className="public-layout-container">
      {/* Navbar that is always visible */}
      <Navbar />

      {/* Main content area */}
      <div className="public-main-content">
        {children}
      </div>
    </div>
  );
};

export default PublicLayout;
