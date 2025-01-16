
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
// import EventIcon from '@mui/icons-material/Event';
// import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import GroupIcon from '@mui/icons-material/Group';

interface AdminSidebarProps {
  toggled: boolean;
  onBackdropClick: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ toggled, onBackdropClick }) => {
  return (
    <Sidebar
      onBackdropClick={onBackdropClick}
      toggled={toggled}
      breakPoint="all"
      style={{
        position: 'fixed',
        top: '70px',
        left: toggled ? '0' : '-250px',
        width: '250px',
        height: 'calc(100% - 75px)', // Adjust for navbar height
        transition: 'left 0.3s ease',
        backgroundColor: '#333333',
        borderRight: '1px solid #0e1a35',
        zIndex: 5,
      }}
    >
      <Menu style={{ color: '#fff' }}>
        {/* MenuItem for Rates */}
        <MenuItem  icon={<GroupIcon style={{ color: 'white' }} />} 
         component={<Link to="/create-user" style={{ color: '#fff' }}  />} >
           Create User
        </MenuItem>

        {/* MenuItem for Create User */}
        <MenuItem  icon={<GroupIcon style={{ color: 'white' }} />} style={{ color: '#cfd7e6' }} 
         component={<Link to="/Home" />} >
           Home
        </MenuItem>

        <MenuItem  icon={<GroupIcon style={{ color: 'white' }} />} style={{ color: '#cfd7e6' }} 
         component={<Link to="/role-permission-management" />} >
           URPM
        </MenuItem>

        <MenuItem  icon={<GroupIcon style={{ color: 'white' }} />} style={{ color: '#cfd7e6' }} 
          component={<Link to="/resource-list" />} >
          Route Auth Resources
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default AdminSidebar;
