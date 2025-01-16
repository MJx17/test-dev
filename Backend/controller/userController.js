// controller/userController.js
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Role = require('../models/roles');  // Assuming you have a role model

// Refresh Access Token if expired
exports.refreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ error: 'No refresh token provided.' });
  }

  try {
    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    // Generate a new access token
    const newAccessToken = jwt.sign(
      { userId: decoded.userId, role: decoded.role },
      process.env.JWT_SECRET,
      { expiresIn: '15m' } // New access token expiry
    );

    // Return the new access token in the cookie
    res.cookie('accessToken', newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      sameSite: 'Strict',
      maxAge: 15 * 60 * 1000, // 15 minutes expiration
    });

    return res.status(200).json({ message: 'Access token refreshed successfully.' });

  } catch (err) {
    // Handle error if refresh token is invalid or expired
    return res.status(403).json({ error: 'Failed to refresh access token.' });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  try {
    // Populate the role and nested permissions fields
    const user = await User.findOne({ email })
      .populate({
        path: 'role',
        populate: { path: 'permissions' }  // Populate permissions inside role
      });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: 'Invalid credentials.' });
    }

    // Ensure permissions is an array before calling map()
    const permissions = user.role.permissions ? user.role.permissions.map(perm => perm.name) : [];

    // Create JWT with userId, role, and permissions
    const accessToken = jwt.sign(
      { 
        userId: user._id, 
        role: user.role.name, 
        permissions: permissions // Include permissions in the token
      },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
      { 
        userId: user._id, 
        role: user.role.name, 
        permissions: permissions // Include permissions in the refresh token
      },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: '7d' }
    );

    // Save the refresh token to the user document
    user.refreshToken = refreshToken;
    await user.save();

    // Set the tokens as cookies
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 15 * 60 * 1000, // 15 minutes
      path: '/',
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: '/',
    });

    return res.status(200).json({
      message: 'Login successful.',
      role: user.role.name,
      permissions: permissions // Return permissions to the client if needed
    });
  } catch (err) {
    console.error('Login error:', err.message);
    return res.status(500).json({ error: 'Error logging in.' });
  }
};




// Create User (Admin or SuperAdmin only)
exports.createUser = async (req, res) => {
  const { name, email, password, roleName } = req.body;

  try {
    // Ensure the role exists
    const role = await Role.findOne({ name: roleName });
    if (!role) {
      return res.status(400).json({ error: 'Role does not exist.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: role._id,
    });

    await newUser.save();

    res.status(201).json({ message: 'User created successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Error creating user.', message: err.message });
  }
};

// Logout User
exports.logoutUser = async (req, res) => {
  try {
    // Get the refresh token from cookies
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(400).json({ error: 'No refresh token found.' });
    }

    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    // Find the user by userId from the decoded token
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Invalidate the refresh token stored in the user's record (optional)
    user.refreshToken = null;
    await user.save();

    // Clear the cookies for both accessToken and refreshToken
    res.clearCookie('accessToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
    });

    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
    });

    res.status(200).json({ message: 'Logout successful.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error logging out.', message: err.message });
  }
};
