import React, { forwardRef, MouseEventHandler } from "react";
import { TextField, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "../styles/navbar.scss";

// Define types for the MenuItem props
interface MenuItemProps {
  label: string;
  onMouseEnter: MouseEventHandler<HTMLLIElement>;
  href: string;
}

// Define the MenuItem component
const MenuItem: React.FC<MenuItemProps> = ({ label, onMouseEnter, href }) => (
  <li className="menu-item" onMouseEnter={onMouseEnter}>
    <a href={href}>{label}</a>
  </li>
);

// Define types for the MegaMenu props
interface MegaMenuProps {
  activeDropdown: string | null;
  onMouseEnter: MouseEventHandler<HTMLDivElement>;
  onMouseLeave: MouseEventHandler<HTMLDivElement>;
  searchQuery: string;
  onQueryChange: (query: string) => void;
  onSearch: () => void;
  onCloseSearch: () => void;
}

// Define the MegaMenu component and forward refs if needed
const MegaMenu = forwardRef<HTMLDivElement, MegaMenuProps>(({
  activeDropdown,
  onMouseEnter,
  onMouseLeave,
  searchQuery,
  onQueryChange,
  onSearch,
  onCloseSearch
}, ref) => (
  <div
    ref={ref}
    className={`mega-menu-container ${activeDropdown ? "visible" : ""}`}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    <div className="mega-menu-content">
      {activeDropdown === "personal" && (
        <div className="mega-menu-column">
          <h3>Personal</h3>
          <ul>
            <Accordion slotProps={{ heading: { component: 'h4' } }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <MenuItem label="Philtrust BankOnline" href="#personal1" onMouseEnter={() => {}} />
              </AccordionSummary>
              <AccordionDetails>
                <ul>
                  <li>InstaPay</li>
                  <li>Peso Net</li>
                </ul>
              </AccordionDetails>
            </Accordion>
            <MenuItem label="Loans" href="#personal3" onMouseEnter={() => {}} />
            <MenuItem label="Savings and Deposit" href="#personal4" onMouseEnter={() => {}} />
            <MenuItem label="Personal Trust Services" href="#personal5" onMouseEnter={() => {}} />
            <MenuItem label="Other Services" href="#personal6" onMouseEnter={() => {}} />
          </ul>
        </div>
      )}
      {activeDropdown === "business" && (
        <div className="mega-menu-column">
          <h3>Business</h3>
          <ul>
            <MenuItem label="Corporate Loans" href="#business1" onMouseEnter={() => {}} />
            <MenuItem label="International Services" href="#business2" onMouseEnter={() => {}} />
            <MenuItem label="Institutional Trust Services" href="#business3" onMouseEnter={() => {}} />
          </ul>
        </div>
      )}

      {/* Search Section */}
      {activeDropdown === "search" && (
        <div className="mega-menu-search">
          What do you want to search?
          <div className="search-container">
            <TextField
              label="Search"
              variant="outlined"
              value={searchQuery}
              onChange={(e) => onQueryChange(e.target.value)}
              fullWidth
            />
            <Button
              variant="contained"
              color="primary"
              onClick={onSearch}
              className="search-input-button"
            >
              Search
            </Button>
            <IconButton onClick={onCloseSearch} className="navbar-close-button">
              <CloseIcon />
            </IconButton>
          </div>
        </div>
      )}
    </div>
  </div>
));

export default MegaMenu;
