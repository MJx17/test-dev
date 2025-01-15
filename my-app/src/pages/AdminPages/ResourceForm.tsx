import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  Button,
  Chip,
  Box,
} from '@mui/material';
import { useResourceStore } from '../../store/resourceStore'; // Zustand store for resources
import { useRoleStore } from '../../store/RoleStore'; // Zustand store for roles
import { usePermissionStore } from '../../store/PermissionStore'; // Zustand store for permissions
import { Role, Permission } from '../../ServicesTypes';
import { CreateButton } from "../../components/ButtonGroup";

const AddResourceForm = () => {
  const { addResource, loading, error } = useResourceStore();
  const { roles, getAllRoles } = useRoleStore();
  const { permissions, fetchPermissions } = usePermissionStore();

  const [route, setRoute] = useState('');
  const [method, setMethod] = useState('GET');
  const [selectedRoles, setSelectedRoles] = useState<Role[]>([]);
  const [selectedPermissions, setSelectedPermissions] = useState<Permission[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getAllRoles();
    fetchPermissions();
  }, [getAllRoles, fetchPermissions]);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Prepare the resourceData object with the correct types
    const resourceData = {
      route,
      method,
      roles: selectedRoles.map((role) => role._id as string), // Ensure _id is a string
      permissions: selectedPermissions.map((permission) => permission._id as string), // Ensure _id is a string
    };
  
    try {
      await addResource(resourceData); 
      // Reset the form
      setRoute('');
      setMethod('GET');
      setSelectedRoles([]);
      setSelectedPermissions([]);
      alert('Resource added successfully!');
      handleClose();
    } catch (err) {
      console.error(err);
    }
  };
  
  
  

  const handleAddRole = (roleId: string) => {
    const role = roles.find((r) => r._id === roleId);
    if (role && !selectedRoles.find((r) => r._id === roleId)) {
      setSelectedRoles((prev) => [...prev, role]);
    }
  };

  const handleAddPermission = (permissionId: string) => {
    const permission = permissions.find((p) => p._id === permissionId);
    if (permission && !selectedPermissions.find((p) => p._id === permissionId)) {
      setSelectedPermissions((prev) => [...prev, permission]);
    }
  };

  const handleRemoveRole = (roleId: string) => {
    setSelectedRoles((prev) => prev.filter((r) => r._id !== roleId));
  };
  
  const handleRemovePermission = (permissionId: string) => {
    setSelectedPermissions((prev) => prev.filter((p) => p._id !== permissionId));
  };
  

  return (
    <>
        <CreateButton
              onClick={handleClickOpen}
              label=''
              icon=''
              type='create'
            >
              Create Resource Auth
         </CreateButton>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Add Route Authorization</DialogTitle>
        <DialogContent>
          {error && <p style={{ color: 'red' }}>{error}</p>}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label="Route"
              value={route}
              onChange={(e) => setRoute(e.target.value)}
              fullWidth
              required
              margin="normal"
            />
            <Select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              fullWidth
              required
             
              displayEmpty
            >
              <MenuItem value="GET">GET</MenuItem>
              <MenuItem value="POST">POST</MenuItem>
              <MenuItem value="PUT">PUT</MenuItem>
              <MenuItem value="PATCH">PATCH</MenuItem>
              <MenuItem value="DELETE">DELETE</MenuItem>
            </Select>

            <div>
              <label>Roles</label>
              <Select
                onChange={(e) => handleAddRole(e.target.value)}
                fullWidth
                displayEmpty
                value=""
              
              >
                <MenuItem value="" disabled>
                  Select a role
                </MenuItem>
                {roles.map((role) => (
                  <MenuItem key={role._id} value={role._id}>
                    {role.name}
                  </MenuItem>
                ))}
              </Select>
              <Box display="flex" gap={1} flexWrap="wrap">
                    {selectedRoles.map((role) => (
                      <Chip
                        key={role._id}
                        label={role.name}
                        onDelete={() => role._id && handleRemoveRole(role._id)}  // Only call if _id is defined
                      />
                    ))}
                  </Box>
              </div>

            <div>
              <label>Permissions</label>
              <Select
                onChange={(e) => handleAddPermission(e.target.value)}
                fullWidth
                displayEmpty
                value=""
              
              >
                <MenuItem value="" disabled>
                  Select a permission
                </MenuItem>
                {permissions.map((permission) => (
                  <MenuItem key={permission._id} value={permission._id}>
                    {permission.name}
                  </MenuItem>
                ))}
              </Select>
              <Box display="flex" gap={1} flexWrap="wrap">
                {selectedPermissions.map((permission) => (
                  <Chip
                    key={permission._id}
                    label={permission.name}
                    onDelete={() => permission._id && handleRemovePermission(permission._id)}  // Only call if _id is defined
                  />
                ))}
              </Box>
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" disabled={loading}>
            {loading ? 'Saving...' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddResourceForm;
