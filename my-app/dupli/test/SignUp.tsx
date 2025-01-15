import React, { useState, FormEvent, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import '../../styles/Login.scss';
import useAuthStore from '../../src/store/AuthStore';


const AdminSignupForm: React.FC = () => {
  const [role, setRole] = useState<string>(''); // Role selection
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setname] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [roles, setRoles] = useState<any[]>([]); // Fetched roles

  useEffect(() => {
    const fetchRolesData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/roles/signup', {
          withCredentials: true, // Include credentials in the request
        });
        setRoles(response.data);
      } catch (err) {
        console.error('Error fetching roles:', err);
        toast.error('Failed to load roles.');
      }
    };

    fetchRolesData();
  }, []);

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
  
    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!email || !emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      toast.error('Invalid email address.');
      return;
    }
  
    if (!role) {
      setError('Please select a role.');
      toast.error('Role is required.');
      return;
    }
  
    try {
      // Directly pass data in the axios post request
      await axios.post('http://localhost:4000/create-user', {
        name,
        email,
        password,
        roleName: role, // Directly using state values
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      // Reset the form after successful submission
      setRole('');
      setname('');
      setEmail('');
      setPassword('');
      toast.success('Account created successfully!');
    } catch (err) {
      console.error('Signup error:', err);
      setError('Failed to create the account. Please try again.');
      toast.error('Account creation failed.');
    }
  };
  
  

  return (
    <div className="signup-container">
      <div className="form-wrapper">
        <div className="header">
          <img
            src="logo.png"
            alt="logo"
            className="logo"
          />
          <h1>Create Users</h1>
          <p>Create an admin account and assign a role below.</p>
        </div>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSignup} className="form-container">
          <div className="form-group">
            <label htmlFor="role">Assign Role</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="" disabled>
                Select a role to assign
              </option>
              {roles.map((role) => (
                <option key={role._id} value={role.name}>
                  {role.name.charAt(0).toLowerCase() + role.name.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setname(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            Create Account
          </button>
        </form>

        <div className="footer">
          <Link to="/login">Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default AdminSignupForm;
