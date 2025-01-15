const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Role = require('../models/roles');
const Permission = require('../models/permissions'); // Assuming permissions model is separate

// Middleware to authenticate JWT
const authenticateJWT = () => {
  return (req, res, next) => {
    const accessToken = req.cookies?.accessToken;

    if (!accessToken) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'No token provided',
      });
    }

    try {
      const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
      req.user = decoded;
      req.user._id = decoded.userId;

      next();
    } catch (error) {
      console.error('JWT verification error:', error);
      return res.status(403).json({
        error: 'Forbidden',
        message: 'Invalid or expired token',
      });
    }
  };
};

// Middleware to check permissions dynamically based on the user's role
const authorizeRoleAndPermissions = (requiredRoles = [], requiredPermissions = []) => {
  return async (req, res, next) => {
    try {
      if (!req.user || !req.user._id) {
        return res.status(401).json({
          error: 'Unauthorized',
          message: 'User is not authenticated',
        });
      }

      // Fetch user and populate the role with permissions
      const user = await User.findById(req.user._id).populate({
        path: 'role',
        populate: {
          path: 'permissions',  // Populate permissions for the role
          model: 'Permission',
        },
      });

      if (!user) {
        return res.status(404).json({
          error: 'Not Found',
          message: 'User not found',
        });
      }

      const userRole = user.role.name.toLowerCase();
      const rolePermissions = user.role.permissions.map(perm => perm.name); // Get an array of permission names

      // Check if user role is allowed (check against the requiredRoles array)
      if (requiredRoles.length > 0 && !requiredRoles.includes(userRole)) {
        return res.status(403).json({
          error: 'Forbidden',
          message: 'You do not have the required role to access this resource',
        });
      }

      // Check if user has the required permissions
      if (
        requiredPermissions.length > 0 &&
        !requiredPermissions.every((perm) => rolePermissions.includes(perm))
      ) {
        return res.status(403).json({
          error: 'Forbidden',
          message: 'You do not have the required permissions',
        });
      }

      next();  // Pass control to the next middleware or route handler
    } catch (err) {
      console.error('Error during authorization:', err);
      return res.status(500).json({
        error: 'Internal Server Error',
        message: 'An error occurred during authorization',
      });
    }
  };
};

module.exports = {
  authenticateJWT,
  authorizeRoleAndPermissions,
};
