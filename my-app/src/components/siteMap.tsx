// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import '../styles/sitemap.scss';
// import FacebookIcon from '@mui/icons-material/Facebook';
// import TwitterIcon from '@mui/icons-material/Twitter';
// import LinkedInIcon from '@mui/icons-material/LinkedIn';
// import Accordion from '@mui/material/Accordion';
// import AccordionDetails from '@mui/material/AccordionDetails';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import { menuData } from '../data/navbar';
// import useIsMobile from '../hooks/mobile';


// const SiteMap: React.FC = () => {


//   // State to track which main accordion is expanded (by id)
//   const [expandedMain, setExpandedMain] = useState<string | false>(false);

//   // State to track which nested accordions are expanded (object: parentId -> expandedId)
//   const [expandedNested, setExpandedNested] = useState<{ [parentId: string]: string | false }>({});


//   // Toggle nested accordion expansion by parent and nested id
//   const handleNestedChange = (parentId: string, panel: string) => (
//     event: React.SyntheticEvent,
//     isExpanded: boolean
//   ) => {
//     setExpandedNested((prev) => ({
//       ...prev,
//       [parentId]: isExpanded ? panel : false,
//     }));
//   };

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
//             <div
//               className="icons"
//               style={{ display: 'flex', gap: '20px', alignItems: 'center' }}
//             >
//               <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
//                 <FacebookIcon style={{ fontSize: 32, color: '#fff' }} />
//               </a>
//               <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
//                 <TwitterIcon style={{ fontSize: 32, color: '#fff' }} />
//               </a>
//               <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
//                 <LinkedInIcon style={{ fontSize: 32, color: '#fff' }} />
//               </a>
//             </div>
//           </div>
//         </div>

//         <div className="right-side">
//           <div className="sitemap-sections">
//             {useIsMobile() ? (
//               <ul className="">
//                 {menuData.map((item, index) => {
//                   const mainId = `main-${index}`;
//                   return (
//                     <Accordion
//                       key={mainId}
//                       expanded={expandedMain === mainId}
//                       onChange={(_, isExpanded) =>
//                         setExpandedMain(isExpanded ? mainId : false)
//                       }
//                       sx={{
//                         backgroundColor: 'transparent',
//                         backgroundImage: 'none',
//                         color: 'white',
//                         '&::before': {
//                           display: 'block',
//                           backgroundColor: 'white',
//                         },
//                       }}
//                     >
//                       <AccordionSummary
//                         expandIcon={item.subItems ? <ExpandMoreIcon sx={{ color: 'white' }} /> : null}
//                         aria-controls={`${item.label.toLowerCase()}-content`}
//                         id={`${item.label.toLowerCase()}-header`}
//                         sx={{ background: 'none' }}
//                       >
//                         <li className="menu-item-sitemap">
//                           <Link className="link" to={item.path}>
//                             {item.label}
//                           </Link>
//                         </li>
//                       </AccordionSummary>

//                       {item.subItems && (
//                         <AccordionDetails>
//                           {item.subItems.map((subItem, subIndex) => {
//                             const nestedId = `nested-${mainId}-${subIndex}`;
//                             return (
//                               <Accordion
//                                 key={nestedId}
//                                 expanded={expandedNested[mainId] === nestedId}
//                                 onChange={handleNestedChange(mainId, nestedId)}
//                                 sx={{
//                                   backgroundColor: 'transparent',
//                                   backgroundImage: 'none',
//                                   border: 'none',
//                                   color: 'white',
//                                   '&::before': {
//                                     display: 'block',
//                                     backgroundColor: 'white',
//                                   },
//                                 }}
//                               >
//                                 <AccordionSummary
//                                   expandIcon={
//                                     subItem.subItems ? (
//                                       <ExpandMoreIcon sx={{ color: 'white' }} />
//                                     ) : null
//                                   }
//                                   aria-controls={`${subItem.label.toLowerCase()}-content`}
//                                   id={`${subItem.label.toLowerCase()}-header`}
//                                 >
//                                   <li className="menu-item-sitemap">
//                                     <Link to={subItem.path}>{subItem.label}</Link>
//                                   </li>
//                                 </AccordionSummary>

//                                 {subItem.subItems && (
//                                   <AccordionDetails>
//                                     <ul>
//                                       {subItem.subItems.map((nested, nestedIndex) => (
//                                         <li key={nestedIndex} className="menu-item-sitemap">
//                                           <Link to={nested.path}>{nested.label}</Link>
//                                         </li>
//                                       ))}
//                                     </ul>
//                                   </AccordionDetails>
//                                 )}
//                               </Accordion>
//                             );
//                           })}
//                         </AccordionDetails>
//                       )}
//                     </Accordion>
//                   );
//                 })}
//               </ul>
//             ) : (
//               // Desktop layout unchanged
//               <>
//                 {menuData.map((section, index) => (
//                   <div key={index} className="sitemap-section">
//                     <Link to={section.label}>
//                       <h2 className="sitemap-h2">{section.label}</h2>
//                     </Link>
//                     <ul>
//                       {section.path && <li><Link to={section.path}></Link></li>}
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
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SiteMap;














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
