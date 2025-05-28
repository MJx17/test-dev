// import React from "react";
// import { SvgIconProps } from "@mui/material/SvgIcon";
// import { AccountBalance, House, HomeRepairService } from "@mui/icons-material";
// import "../styles/home.scss";

// // TypeScript type for the props of the card
// interface FeatureCardProps {
//   icon: React.ElementType<SvgIconProps>; // This allows us to pass any icon as a prop
//   title: string; // Title for the card
// }

// // Single card component
// const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title }) => {
//   return (
//     <div className="feature-card">
//       <div className="feature-card-icon">
//         <Icon className="feature-card-icons" />
//       </div>
//       <div className="feature-card-title">
//         <h2>{title}</h2>
//       </div>
//     </div>
//   );
// };

// // Data for each card (icon and title)
// const cardData = [
//   { icon: AccountBalance, title: "Branch Locator" },
//   { icon: House, title: "Properties" },
//   { icon: HomeRepairService, title: "Careers" },
//   // You can add more card items here
// ];

// // Container component that renders all cards
// const FeatureCardList: React.FC = () => {
//   return (
//     <div className="feature-card-container">
//       {cardData.map((card, index) => (
//         <FeatureCard key={index} icon={card.icon} title={card.title} />
//       ))}
//     </div>
//   );
// };

// export default FeatureCardList;




// import React from "react";
// import { Button } from "@mui/material";
// import { AccountBalance, House, HomeRepairService } from "@mui/icons-material";
// import "../styles/home.scss";

// const FeatureBanner: React.FC = () => {
//   return (
//     <div className="feature-banner">
//       <div className="feature-banner-item">
//         <AccountBalance className="feature-banner-icon" />
//         <Button variant="contained" color="primary">
//           Branch Locator
//         </Button>
//       </div>
//       <div className="feature-banner-item">
//         <House className="feature-banner-icon" />
//         <Button variant="contained" color="primary">
//           Properties
//         </Button>
//       </div>
//       <div className="feature-banner-item">
//         <HomeRepairService className="feature-banner-icon" />
//         <Button variant="contained" color="primary">
//           Careers
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default FeatureBanner;





// import React from "react";
// import { Tooltip, IconButton } from "@mui/material";
// import { AccountBalance, House, HomeRepairService } from "@mui/icons-material";
// import "../styles/home.scss";

// const navItems = [
//   { icon: AccountBalance, title: "Branch Locator" },
//   { icon: House, title: "Properties" },
//   { icon: HomeRepairService, title: "Careers" },
// ];

// const MiniNavbar: React.FC = () => {
//   return (
//     <div className="mini-navbar">
//       {navItems.map((item, index) => (
//         <div key={index} className="mini-navbar-item">
//           <Tooltip title={item.title} arrow>
//             <IconButton>
//               <item.icon className="mini-navbar-icon" />
//             </IconButton>
//           </Tooltip>
//           <span className="mini-navbar-title">{item.title}</span>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default MiniNavbar;
import React from "react";
import { Tooltip } from "@mui/material";
import { AccountBalance, House, HomeRepairService, Login } from "@mui/icons-material";
import { Link } from "react-router-dom";
import "../styles/navbar.scss";


const navItems = [
  { icon: AccountBalance, title: "Branch Locator", link: "/branch" },
  { icon: House, title: "Properties", link: "/properties" },
  { icon: HomeRepairService, title: "Careers", link: "/careers" },
];

const HorizontalNavbar: React.FC = () => {
  return (
    <div className="horizontal-navbar">
      {/* Internal Routes */}
      {navItems.map((item, index) => (
        <Tooltip key={index} title={item.title} arrow>
          <Link to={item.link} className="horizontal-navbar-item">
            <item.icon className="horizontal-navbar-icon" />
            <span className="horizontal-navbar-title">{item.title}</span>
          </Link>
        </Tooltip>
      ))}

      {/* External Login */}
      <Tooltip title="Login" arrow>
        <a
          href="https://www.philtrustbankonline.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="horizontal-navbar-item login-navbar-item"
        >
          <Login className="horizontal-navbar-icon" />
          <span className="horizontal-navbar-title">Login</span>
        </a>
      </Tooltip>
    </div>
  );
};

export default HorizontalNavbar;
