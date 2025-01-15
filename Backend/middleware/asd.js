const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Role = require('../models/roles');
const Permission = require('../models/permissions'); // Assuming permissions model is separate
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 0 });



const authenticateJWT = (req, res, next) => {
  const accessToken = req.cookies?.accessToken;

  if (!accessToken) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'No token provided',
    });
  }

  jwt.verify(accessToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        error: 'Forbidden',
        message: 'Invalid or expired token',
      });
    }

    if (!decoded.userId || !decoded.role) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Token is missing required information',
      });
    }

    req.user = decoded; // Attach user info
    next();
  });
};


// const authorize = (requiredRoles = [], requiredPermissions = []) => {
//   return async (req, res, next) => {
//     // Ensure the user is authenticated
//     if (!req.user) {
//       return res.status(401).json({
//         error: 'Unauthorized',
//         message: 'User is not authenticated',
//       });
//     }

//     try {
//       // Access the user's permissions from the decoded JWT token
//       const userPermissions = req.user.permissions || [];

//       // Check if the user's role matches any of the required roles
//       if (requiredRoles.length > 0 && !requiredRoles.includes(req.user.role)) {
//         return res.status(403).json({
//           error: 'Forbidden',
//           message: 'You do not have the required role to access this resource',
//         });
//       }

//       // Check if the user has the required permissions
//       if (
//         requiredPermissions.length > 0 &&
//         !requiredPermissions.every((perm) => userPermissions.includes(perm))
//       ) {
//         return res.status(403).json({
//           error: 'Forbidden',
//           message: 'You do not have the required permissions',
//         });
//       }

//       next(); // Proceed to the next middleware or route handler
//     } catch (err) {
//       console.error('Error during authorization:', err);
//       return res.status(500).json({
//         error: 'Internal Server Error',
//         message: 'An error occurred while checking user authorization',
//       });
//     }
//   };
// };

const authorize = (requiredRoles = [], requiredPermissions = []) => {
  return async (req, res, next) => {
    const accessToken = req.cookies?.accessToken;

    if (!accessToken) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'No token provided',
      });
    }

    try {
      // Verify and decode the JWT token
      const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
      req.user = decoded; // Attach user data to request
      req.user._id = decoded.userId; // Ensure userId is attached properly
      req.user.role = decoded.role;  // Ensure the role is attached to the user

      // Fetch the user and their role from the database
      const user = await User.findById(req.user._id).populate({
        path: 'role',
        populate: { path: 'permissions' }, // Populate permissions inside the role
      });

      if (!user) {
        return res.status(404).json({
          error: 'Not Found',
          message: 'User not found in the database',
        });
      }

      // Extract the user's role and permissions
      const userRole = user.role.name.toLowerCase();
      const userPermissions = user.role.permissions.map(perm => perm.name.toLowerCase());

      // Check if the user's role matches any of the required roles
      if (requiredRoles.length > 0 && !requiredRoles.includes(userRole)) {
        return res.status(403).json({
          error: 'Forbidden',
          message: 'You do not have the required role to access this resource',
        });
      }

      // Check if the user has the required permissions
      if (
        requiredPermissions.length > 0 &&
        !requiredPermissions.every((perm) => userPermissions.includes(perm.toLowerCase()))
      ) {
        return res.status(403).json({
          error: 'Forbidden',
          message: 'You do not have the required permissions to access this resource',
        });
      }

      // If both checks pass, continue to the next middleware
      next();
    } catch (error) {
      console.error('Authorization error:', error);
      return res.status(403).json({
        error: 'Forbidden',
        message: 'Invalid or expired token',
      });
    }
  };
};

  

module.exports = {
  authenticateJWT,
  authorize,
};
