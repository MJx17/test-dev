import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from '@mui/material';
import { usePermissionStore } from '../../store/PermissionStore'; // Import your store

import { CreateButton } from "../../components/ButtonGroup";

const CreatePermissionDialog = () => {
  // Local state for dialog visibility
  const [open, setOpen] = useState(false);

  // Local state to hold the input values for the permission
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  // Accessing the store's state and actions
  const { createPermission, loading, error } = usePermissionStore();

  // Open and close the dialog
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setName('');
    setDescription('');
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Create the permission data object
    const newPermission = {
      id: `${Date.now()}`, // Example of generating a unique ID (use a real ID generator if needed)
      name,
      category,
      description,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      await createPermission(newPermission);
      // Clear form fields after successful creation and close the dialog
      setName('');
      setDescription('');
      setOpen(false);
    } catch (error) {
      console.error('Error creating permission:', error);
    }
  };

  return (
    <div>
      {/* Button to trigger dialog */}

         <CreateButton
          
             onClick={handleOpen}
             label=''
             icon=''
             type='create'
           >
             Create Permission
           </CreateButton>
     


      {/* Dialog for form */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New Permission</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="text"
              fullWidth
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <TextField
              margin="dense"
              id="description"
              label="Description"
              type="text"
              fullWidth
              variant="outlined"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              multiline
              rows={3}
            />
              <TextField
              margin="dense"
              id="category"
              label="Category"
              type="text"
              fullWidth
              variant="outlined"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              multiline
              rows={3}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button type="submit" color="primary" disabled={loading}>
              {loading ? 'Creating...' : 'Create'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Error message */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default CreatePermissionDialog;
