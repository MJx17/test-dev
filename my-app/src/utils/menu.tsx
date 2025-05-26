import React, { forwardRef, MouseEventHandler } from "react";
import { Link } from "react-router-dom";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { menuData } from "../data/navbar"; // adjust path as needed
import "../styles/navbar.scss";

interface MenuItemProps {
  label: string;
  href: string;
  onMouseEnter: MouseEventHandler<HTMLLIElement>;
}

const MenuItem: React.FC<MenuItemProps> = ({ label, onMouseEnter, href }) => (
  <li className="menu-item" onMouseEnter={onMouseEnter}>
    <Link to={href}>{label}</Link>
  </li>
);

interface MegaMenuProps {
  activeDropdown: string | null;
  onMouseEnter: MouseEventHandler<HTMLDivElement>;
  onMouseLeave: MouseEventHandler<HTMLDivElement>;
  onClose: () => void;
}

const MegaMenu = forwardRef<HTMLDivElement, MegaMenuProps>(({
  activeDropdown,
  onMouseEnter,
  onMouseLeave,
  onClose,
}, ref) => {
  const activeMenu = menuData.find(item => item.label.toLowerCase() === activeDropdown?.toLowerCase());

  return (
    <div
      ref={ref}
      className={`mega-menu-container ${activeDropdown ? "visible" : ""}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="mega-menu-content">
        {activeMenu && (
          <div className="mega-menu-column">
            <h3>{activeMenu.label}</h3>
            <ul>
              {activeMenu.subItems?.map((subItem) => {
                if (subItem.subItems && subItem.subItems.length > 0) {
                  return (
                    <Accordion key={subItem.label}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`${subItem.label}-content`}
                        id={`${subItem.label}-header`}
                      >
                        <MenuItem
                          label={subItem.label}
                          href={subItem.path}
                          onMouseEnter={() => {}}
                        />
                      </AccordionSummary>
                      <AccordionDetails>
                        <ul>
                          {subItem.subItems.map((nestedItem) => (
                            <li key={nestedItem.label}>
                              <Link to={nestedItem.path}>{nestedItem.label}</Link>
                            </li>
                          ))}
                        </ul>
                      </AccordionDetails>
                    </Accordion>
                  );
                }

                return (
                  <MenuItem
                    key={subItem.label}
                    label={subItem.label}
                    href={subItem.path}
                    onMouseEnter={() => {}}
                  />
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
});

export default MegaMenu;
