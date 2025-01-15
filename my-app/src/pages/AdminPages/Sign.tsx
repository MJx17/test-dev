import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAdminSignupStore from '../../store/form';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import '../../styles/Login.scss';

const AdminSignupForm: React.FC = () => {
  const {
    role,
    setRole,
    email,
    setEmail,
    password,
    setPassword,
    name,
    setName,
    error,
    roles,
    fetchRolesData,
    signupAdmin,
    resetForm,
  } = useAdminSignupStore();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchRolesData(); // Fetch roles when the component mounts
  }, [fetchRolesData]);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signupAdmin();
      resetForm();
      toast.success('Account created successfully!');
      setOpen(false);
    } catch {
      toast.error(error || 'Failed to create the account.');
    }
  };

  return (
    <>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        Create Admin Account
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Create Users</DialogTitle>
        <DialogContent>
          <div className="form-wrapper">
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSignup} className="form-container">
              <FormControl fullWidth margin="normal">
                <InputLabel htmlFor="role">Assign Role</InputLabel>
                <Select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  label="Assign Role"
                  required
                >
                  <MenuItem value="" disabled>
                    Select a role to assign
                  </MenuItem>
                  {roles.map((role) => (
                    <MenuItem key={role._id} value={role.name}>
                      {role.name.charAt(0).toUpperCase() + role.name.slice(1)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                label="Name"
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                fullWidth
                margin="normal"
              />

              <TextField
                label="Email"
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                fullWidth
                margin="normal"
              />

              <TextField
                label="Password"
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                fullWidth
                margin="normal"
              />

              <Button type="submit" variant="contained" fullWidth>
                Create Account
              </Button>
            </form>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <Button color="primary">Back to Login</Button>
          </Link>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AdminSignupForm;
