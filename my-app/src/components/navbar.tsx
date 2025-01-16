import React, { useState, useRef, useEffect } from 'react';
import '../styles/navbar.scss';
// import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';
import MegaMenu from '../utils/menu';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';

// Define types for MegaMenu props (if they exist in your project)
// interface MegaMenuProps {
//   activeDropdown: string | null;
//   onMouseEnter: () => void;
//   onMouseLeave: () => void;
//   searchQuery: string;
//   onSearchChange: (query: string) => void;
//   onSearch: () => void;
// }

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  // const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const navbarRef = useRef<HTMLDivElement>(null);
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const linksContainerRef = useRef<HTMLDivElement>(null);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // const handleSearch = () => {
  //   console.log('Search query:', searchQuery);
  //   setSearchQuery('');
  //   setActiveDropdown(null);
  // };

  const handleMouseEnterMenu = (menu: string) => {
    setActiveDropdown(menu);
  };

  const handleMouseLeaveMegaMenu = () => {
    setActiveDropdown(null);
  };

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (event instanceof MouseEvent) {
        if (
          navbarRef.current &&
          !navbarRef.current.contains(event.target as Node) &&
          megaMenuRef.current &&
          !megaMenuRef.current.contains(event.target as Node) &&
          linksContainerRef.current &&
          !linksContainerRef.current.contains(event.target as Node)
        ) {
          setActiveDropdown(null);
          setIsMobileMenuOpen(false);
        }
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  

  return (
    <div className="navbar-container" ref={navbarRef}>
      <nav className="navbar">
        <div className="navbar-logo">
          <Link to="/">
            <img
              src="logo.webp"
              style={{ backgroundColor: 'white' }}
              alt="logo"
              className="logo"
            />
          </Link>
          <div className="navbar-text">
            <Link className="text-logo" to="/">
              Philtrust Bank
            </Link>
            <Link className="subtext-logo" to="/">
              Universal Bank
            </Link>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="navbar-links-container">
          <ul className="navbar-links">
            <li className="menu-item">
              <Link
                to="/personal"
                onMouseEnter={() => handleMouseEnterMenu('personal')}
              >
                Personal
              </Link>
            </li>
            <li className="menu-item">
              <Link
                to="/business"
                onMouseEnter={() => handleMouseEnterMenu('business')}
              >
                Business
              </Link>
            </li>
            <li className="menu-item">
              <Link
                to="/about"
                onMouseEnter={() => handleMouseEnterMenu('about')}
              >
                About Us
              </Link>
            </li>
            <li className="menu-item">
              <Link
                to="/investors"
                onMouseEnter={() => handleMouseEnterMenu('investors')}
              >
                For Investors
              </Link>
            </li>
            <li className="menu-item">
              <Link
                to="/contact"
                onMouseEnter={() => handleMouseEnterMenu('contact')}
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        <div className="login-container">
          <ul className="login-links">
            <li className="login-menu">
              <a
                href="https://www.philtrustbankonline.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="button-link"
              >
                Login
              </a>
            </li>
          </ul>
        </div>

        <IconButton className="navbar-toggle" onClick={toggleMobileMenu}>
          <MenuIcon style={{ color: '#fff' }} className="menu-icon" />
        </IconButton>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu" ref={linksContainerRef}>
          <ul className="mobile-menu-links">
            <Accordion sx={{ boxShadow: 'none' }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="personal-content"
                id="personal-header"
                sx={{ boxShadow: 'none' }}
              >
                <li className="menu-item">
                  <Link to="/personal">Personal</Link>
                </li>
              </AccordionSummary>
              <AccordionDetails>
                {/* Sub-Accordions */}
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="personal-loans-content"
                    id="personal-loans-header"
                  >
                    <li>
                      <Link to="/loans">Loans</Link>
                    </li>
                  </AccordionSummary>
                  <AccordionDetails>
                    <ul>
                      <li>
                        <Link to="/home-loan">Home Loan</Link>
                      </li>
                      <li>
                        <Link to="/car-loan">Car Loan</Link>
                      </li>
                    </ul>
                  </AccordionDetails>
                </Accordion>
              </AccordionDetails>
            </Accordion>
          </ul>
        </div>
      )}

      <MegaMenu
        activeDropdown={activeDropdown}
        onMouseEnter={() => setActiveDropdown(activeDropdown)}
        onMouseLeave={handleMouseLeaveMegaMenu}
        // searchQuery={searchQuery}
        // onSearchChange={setSearchQuery}
        // onSearch={handleSearch}
        ref={megaMenuRef}
      />
    </div>
  );
};

export default Navbar;
