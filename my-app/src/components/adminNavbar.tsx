import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import useAuthStore from '../store/AuthStore';
import '../styles/navbar.scss' 

interface AdminNavbarProps {
  onToggleSidebar: () => void;
}

const AdminNavbar: React.FC<AdminNavbarProps> = ({ onToggleSidebar }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { logout } = useAuthStore();
  const navigate = useNavigate(); // For navigation

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget); // Open the menu on icon click
  };

  const handleCloseMenu = () => {
    setAnchorEl(null); // Close the menu
  };

  const handleLogout = async () => {
    try {
      await logout(); // Call the logout function and wait for it to finish
      // Redirect to login or home page after logout
      navigate('/login'); // Adjust the path if needed (e.g., '/')
    } catch (error) {
      console.error('Logout failed:', error);
      // Handle any errors (e.g., show a notification or error message)
    }
  };

  const handleProfileRedirect = () => {
    // Redirect to the user profile page
    navigate('/user-profile'); // Adjust to the correct user profile path
  };

  return (
    <nav style={styles.AdminNavbar}>
      <div style={styles.navbarContent}>
        {/* Left Section: Sidebar Toggle Button */}
        <button onClick={onToggleSidebar} style={styles.sidebarButton} aria-label="Toggle Sidebar">
          &#9776; {/* Hamburger icon */}
        </button>

        {/* Right Section: Search Bar and Icons */}
        <div style={styles.rightSection}>
          {/* Search Bar */}
          <div className='searchBar' style={styles.searchBar}>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search..."
              style={styles.searchInput}
            />
            <IconButton style={styles.searchButton}>
              <SearchIcon />
            </IconButton>
          </div>

          {/* Icons for Notifications, Settings, User Profile */}
          <div style={styles.iconGroup}>
            <IconButton style={styles.iconButton} aria-label="Notifications">
              <NotificationsIcon />
            </IconButton>
            <IconButton style={styles.iconButton} aria-label="Settings">
              <SettingsIcon />
            </IconButton>
            {/* Person Icon with dropdown */}
            <IconButton style={styles.iconButton} onClick={handleProfileClick} aria-label="User Profile">
              <PersonIcon />
            </IconButton>
          </div>

          {/* Menu for Profile and Logout */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={handleProfileRedirect}>
              <ListItemIcon>
                <PersonIcon fontSize="small" />
              </ListItemIcon>
              My Profile
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <ExitToAppIcon fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </div>
      </div>
    </nav>
  );
};

const styles = {
  AdminNavbar: {
    position: 'fixed' as 'fixed',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#333',
    padding: '10px',
    zIndex: 10,
  },
  navbarContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sidebarButton: {
    background: 'transparent',
    border: 'none',
    color: '#fff',
    fontSize: '24px',
    cursor: 'pointer',
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
  },
  searchBar: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#444',
    borderRadius: '20px',
    padding: '5px 10px',
    marginRight: '15px',

  },
  
  
  searchInput: {
    border: 'none',
    backgroundColor: 'transparent',
    color: '#fff',
    padding: '5px',
    width: '150px',
    outline: 'none',
  },
  searchButton: {
    color: '#fff',
  },
  iconGroup: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '15px',
  },
  iconButton: {
    color: '#fff',
    marginLeft: '10px',
  },
};

export default AdminNavbar;
