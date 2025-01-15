import React, { useState } from 'react';
import { useRoleStore } from '../../store/RoleStore';
import { toast } from 'react-toastify';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { Role } from '../../ServicesTypes';
import { CreateButton } from "../../components/ButtonGroup";

const AddRoleForm = () => {
  const { loading, roleName, setRoleName, resetRoleName, addRole } = useRoleStore();
  const [open, setOpen] = useState(false); // State to control dialog visibility

  const handleClickOpen = () => {
    setOpen(true); // Open the dialog
  };

  const handleClose = () => {
    setOpen(false); // Close the dialog
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!roleName.trim()) {
      toast.error("Role name is required!");
      return;
    }
  
    const newRole: Role = {
      name: roleName,
      permissions: [], // Optional; can also be omitted
    };
  
    try {
      await addRole(newRole);
      resetRoleName();
      setOpen(false);
    } catch (error) {
      // Error handling is already done in the store
    }
  };
  

  return (
    <div>
      {/* Button to open dialog */}
      <CreateButton
        onClick={handleClickOpen}
        label=''
        icon=''
        type='create'
      >
        Create Role
      </CreateButton>


      {/* Dialog box */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Role</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              autoFocus
              margin="dense"
              label="Role Name"
              type="text"
              fullWidth
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              placeholder="Enter role name"
              disabled={loading}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" disabled={loading}>
            {loading ? 'Adding...' : 'Add Role'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddRoleForm;
