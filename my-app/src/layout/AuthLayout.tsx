import React, { ReactNode, useState } from 'react';
import Navbar from '../components/adminNavbar';
import SidebarComponent from '../components/sidebar'; // Import the Sidebar component
import '../styles/layout.scss';

interface LayoutProps {
  children: ReactNode; // `children` prop can be any valid React node
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [toggled, setToggled] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'auto', minHeight: '100vh' }}>
      {/* Full-width Navbar */}
      <Navbar onToggleSidebar={() => setToggled(!toggled)} />

      {/* Wrapper for Sidebar and Main Content */}
      <div style={{ display: 'flex', flex: 1 }}>
        {/* Sidebar as an overlay */}
        <SidebarComponent 
          toggled={toggled} 
          onBackdropClick={() => setToggled(false)} 
        />

        {/* Main content area */}
        <div style={{
          flex: 1,
          marginTop: '20px', // Ensures space for the Navbar height
          padding: '20px', // Default padding
          overflowY: 'auto', // Makes the content scrollable
        }} className='main-content'>
          <main>{children}</main>
        </div>
      </div>

      {/* Backdrop for overlay effect */}
      {toggled && (
        <div
          onClick={() => setToggled(false)}
          style={{
            position: 'fixed',
            top: '55px',
            left: 0,
            width: '100%',
            height: 'calc(100% - 55px)',
            backgroundColor: 'transparent',
            zIndex: 4, // Below sidebar but above main content
          }}
        />
      )}
    </div>
  );
};

export default Layout;
