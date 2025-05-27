import React, { ReactNode } from 'react';
import Navbar from '../components/navbar';  // Assuming Navbar is your public navbar component
// import Navbar2 from '../components/navbar2';  // Assuming Navbar is your public navbar component
import '../styles/global.scss';      // Optional, for any styles you'd like to add
import FeatureCardContainer  from "../components/FeautureCardList";
import Footer from '../components/footer';
interface PublicLayoutProps {
  children: ReactNode; // Children are the components that will be rendered inside this layout
}

const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  return (
    <div className="public-layout-container">
      {/* Navbar that is always visible */}
      <FeatureCardContainer />
      <Navbar />
       {/* <Navbar2 /> */}

      {/* Main content area */}
      <div className="public-main-content">
        {children}
      </div>
      <Footer/>
    </div>
  );
};

export default PublicLayout;
