import React, { useState, useRef, useEffect } from 'react';
import '../styles/navbar2.scss';
// import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';
import MegaMenu from '../utils/menu';
// import Accordion from '@mui/material/Accordion';
// import AccordionDetails from '@mui/material/AccordionDetails';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  ListItemIcon,
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import { Link } from 'react-router-dom';
import { menuData } from '../data/navbar';
import useIsMobile from "../hooks/mobile";


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

  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile && activeDropdown) {
      setActiveDropdown(null); // or your dropdown close logic
    }
  }, [isMobile]);

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


  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});






  useEffect(() => {
    const handleScroll = (): void => {
      const navbar = document.querySelector(".navbar") as HTMLElement | null;
      if (navbar) {
        if (window.scrollY > 20) {
          navbar.classList.add("scrolled");
        } else {
          navbar.classList.remove("scrolled");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
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
                to="/our-bank"
                onMouseEnter={() => handleMouseEnterMenu('Our Bank')}
              >
                Our Bank
              </Link>
            </li>
            <li className="menu-item">
              <Link
                to="/investors"
                onMouseEnter={() => handleMouseEnterMenu('For Investors')}
              >
                For Investors
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
          <IconButton className="navbar-toggle" onClick={toggleMobileMenu}>
            <MenuIcon style={{ color: '#fff' }} className="menu-icon" />
          </IconButton>
        </div>


      </nav>



      {isMobileMenuOpen && (
        <div className="mobile-menu" ref={linksContainerRef}>
          <List component="nav" className="mobile-menu-links">
            {menuData.map((item, index) => {
              const mainKey = `main-${index}`;
              const isMainOpen = openItems[mainKey];

              const toggleMain = () => {
                setOpenItems((prev) => ({
                  ...prev,
                  [mainKey]: !prev[mainKey],
                }));
              };

              return (
                <div key={mainKey}>
                  <ListItemButton onClick={item.subItems ? toggleMain : undefined}>
                    <ListItemText sx={{color: 'white'}}>
                      <Link to={item.path || '#'} className="link">
                        {item.label}
                      </Link>
                    </ListItemText>
                    {item.subItems ? (isMainOpen ? <ExpandLess /> : <ExpandMore />) : null}
                  </ListItemButton>

                  {item.subItems && (
                    <Collapse in={isMainOpen} timeout="auto" unmountOnExit>
                      <List disablePadding>
                        {item.subItems.map((subItem, subIndex) => {
                          const subKey = `${mainKey}-${subIndex}`;
                          const isSubOpen = openItems[subKey];

                          const toggleSub = () => {
                            setOpenItems((prev) => ({
                              ...prev,
                              [subKey]: !prev[subKey],
                            }));
                          };

                          return (
                            <div key={subKey}>
                              <ListItemButton onClick={subItem.subItems ? toggleSub : undefined} sx={{ pl: 4 }}>
                                <ListItemText>
                                  <Link to={subItem.path || '#'} className="link">
                                    {subItem.label}
                                  </Link>
                                </ListItemText>
                                {subItem.subItems ? (isSubOpen ? <ExpandLess /> : <ExpandMore />) : null}
                              </ListItemButton>

                              {subItem.subItems && (
                                <Collapse in={isSubOpen} timeout="auto" unmountOnExit>
                                  <List disablePadding>
                                    {subItem.subItems.map((nested, nestedIndex) => (
                                      <ListItemButton
                                        key={`${subKey}-${nestedIndex}`}
                                        component={Link}
                                        to={nested.path || '#'}
                                        sx={{ pl: 6 }}
                                      >
                                        <ListItemText primary={nested.label} />
                                      </ListItemButton>
                                    ))}
                                  </List>
                                </Collapse>
                              )}
                            </div>
                          );
                        })}
                      </List>
                    </Collapse>
                  )}
                </div>
              );
            })}
          </List>
        </div>
      )}




      <MegaMenu
        activeDropdown={activeDropdown}
        onMouseEnter={() => setActiveDropdown(activeDropdown)}
        onMouseLeave={handleMouseLeaveMegaMenu}
        onClose={() => setActiveDropdown(null)}
        // searchQuery={searchQuery}
        // onSearchChange={setSearchQuery}
        // onSearch={handleSearch}
        ref={megaMenuRef}
      />
    </div>
  );
};

export default Navbar;
