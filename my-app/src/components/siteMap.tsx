
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  List,
  ListItemButton,
  ListItemText,
  Collapse,
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { menuData } from '../data/navbar';
import useIsMobile from '../hooks/mobile';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import '../styles/sitemap.scss';
import { Instagram } from '@mui/icons-material';


const SiteMap: React.FC = () => {
  const isMobile = useIsMobile();
  const [openItems, setOpenItems] = useState<{ [parentKey: string]: string | null }>({});

  const toggleItem = (parentKey: string, key: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [parentKey]: prev[parentKey] === key ? null : key,
    }));
  };


const renderMenu = (items: any[], parentKey = 'root') => {
  return (
    <List component="div" disablePadding>
      {items.map((item, index) => {
        const key = `${parentKey}-${index}`;
        const hasChildren = item.subItems && item.subItems.length > 0;

        // Check if this submenu is currently open under this parentKey
        const isOpen = openItems[parentKey] === key;

        return (
          <div key={key}>
            <ListItemButton onClick={() => hasChildren && toggleItem(parentKey, key)}>
              <ListItemText sx={{ color: '#fff' }}>
                <Link className="link" to={item.path}>
                  {item.label}
                </Link>
              </ListItemText>
              {hasChildren ? isOpen ? <ExpandLess /> : <ExpandMore /> : null}
            </ListItemButton>

            {hasChildren && (
              <Collapse in={isOpen} timeout="auto" unmountOnExit>
                {renderMenu(item.subItems, key)}
              </Collapse>
            )}
          </div>
        );
      })}
    </List>
  );
};


  return (
    <div className="sitemap-container">
      <h1 className="sitemap-title">Site Map</h1>
      <div className="sitemap-content">
        <div className="left-side">
          <div className="sitemap-logo">
            <img
              src="https://www.philtrustbank.com/sites/all/themes/foundationptc/images/ptclogo_2018_over100.png"
              alt="Company Logo"
              className="logo-img"
            />
          </div>
          <div className="social-media-icons">
            <h3 className="sitemap-h3">Follow Us</h3>
            <div className="icons" style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FacebookIcon style={{ fontSize: 32, color: '#fff' }} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <Instagram style={{ fontSize: 32, color: '#fff' }} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <LinkedInIcon style={{ fontSize: 32, color: '#fff' }} />
              </a>
            </div>
          </div>
        </div>

        <div className="right-side">
          <div className="sitemap-sections">
            {isMobile ? (
              <div className="sitemap-mobile-list">
                {renderMenu(menuData)}
              </div>
            ) : (
              <>
                {menuData.map((section, index) => (
                  <div key={index} className="sitemap-section">
                    <Link to={section.path || '#'}>
                      <h2 className="sitemap-h2">{section.label}</h2>
                    </Link>
                    <ul>
                      {section.subItems &&
                        section.subItems.map((subItem, subIndex) => (
                          <li key={subIndex}>
                            <Link to={subItem.path}>{subItem.label}</Link>
                            {subItem.subItems && (
                              <ul>
                                {subItem.subItems.map((nested, nestedIndex) => (
                                  <li key={nestedIndex}>
                                    <Link to={nested.path}>{nested.label}</Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </li>
                        ))}
                    </ul>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteMap;






// import { Link } from 'react-router-dom';

// import { menuData } from '../data/navbar';

// import FacebookIcon from '@mui/icons-material/Facebook';
// import LinkedInIcon from '@mui/icons-material/LinkedIn';
// import '../styles/sitemap.scss';
// import { Instagram } from '@mui/icons-material';


// const SiteMap: React.FC = () => {

//   return (
//     <div className="sitemap-container">
//       <h1 className="sitemap-title">Site Map</h1>
//       <div className="sitemap-content">
//         <div className="left-side">
//           <div className="sitemap-logo">
//             <img
//               src="https://www.philtrustbank.com/sites/all/themes/foundationptc/images/ptclogo_2018_over100.png"
//               alt="Company Logo"
//               className="logo-img"
//             />
//           </div>
//           <div className="social-media-icons">
//             <h3 className="sitemap-h3">Follow Us</h3>
//             <div className="icons" style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
//               <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
//                 <FacebookIcon style={{ fontSize: 32, color: '#fff' }} />
//               </a>
//               <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
//                 <Instagram style={{ fontSize: 32, color: '#fff' }} />
//               </a>
//               <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
//                 <LinkedInIcon style={{ fontSize: 32, color: '#fff' }} />
//               </a>
//             </div>
//           </div>
//         </div>

//         <div className="right-side">
//           <div className="sitemap-sections">
           
//               <>
//                 {menuData.map((section, index) => (
//                   <div key={index} className="sitemap-section">
//                     <Link to={section.path || '#'}>
//                       <h2 className="sitemap-h2">{section.label}</h2>
//                     </Link>
//                     <ul>
//                       {section.subItems &&
//                         section.subItems.map((subItem, subIndex) => (
//                           <li key={subIndex}>
//                             <Link to={subItem.path}>{subItem.label}</Link>
//                             {subItem.subItems && (
//                               <ul>
//                                 {subItem.subItems.map((nested, nestedIndex) => (
//                                   <li key={nestedIndex}>
//                                     <Link to={nested.path}>{nested.label}</Link>
//                                   </li>
//                                 ))}
//                               </ul>
//                             )}
//                           </li>
//                         ))}
//                     </ul>
//                   </div>
//                 ))}
//               </>
  
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SiteMap;
