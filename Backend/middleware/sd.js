const jwt = require('jsonwebtoken'); // To verify the JWT token
const User = require('../models/user'); // Assuming User model is defined
const Resource = require('../models/resource'); // Assuming Resource model is defined, adjust path as necessary

/**
 * Middleware to dynamically check roles and permissions for a route-method.
 */
const authorize = () => {
  return async (req, res, next) => {
    // Extract access token from cookies
    const accessToken = req.cookies?.accessToken;

    // If no access token is found, return unauthorized response
    if (!accessToken) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'No token provided',
      });
    }

    try {
      // Verify and decode the JWT token
      const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);  // Ensure your secret key is set in .env
      req.user = decoded;  // Attach decoded user data to request
      req.user._id = decoded.userId; // Ensure userId is attached properly
      req.user.role = decoded.role;  // Ensure role is attached to the user

      // Fetch the user from the database using the userId (populating the role and permissions)
      const user = await User.findById(req.user._id).populate({
        path: 'role',
        populate: { path: 'permissions' },  // Populate permissions inside the role
      });

      // If user not found, return 404 error
      if (!user) {
        return res.status(404).json({
          error: 'Not Found',
          message: 'User not found in the database',
        });
      }

      // Attach the user and role data to req.user for later use
      req.user = user;

      // Now you can perform role-based authorization checks (optional)
      const route = req.baseUrl + req.path;  // Get the route path (e.g., '/roles')
      const method = req.method;  // Get the HTTP method (e.g., 'GET')

      // Check if the user has permission to access the resource
      const hasAccess = await checkUserPermissions(user, route, method);

      if (hasAccess) {
        return next();  // User is authorized, proceed to the next middleware/handler
      } else {
        return res.status(403).json({
          error: 'Forbidden',
          message: 'Insufficient permissions to access this resource',
        });
      }

    } catch (error) {
      console.error('Authorization error:', error);
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Invalid or expired token',
      });
    }
  };
};

/**
 * Helper function to check user's permissions for a given route-method
 */
async function checkUserPermissions(user, route, method) {
  // Find the resource (route-method pair) from the database
  const resource = await findResource(route, method);

  if (!resource) {
    return false;  // If resource not found, deny access
  }

  // Check if the user's permissions match the required permissions for this resource
  return user.role.permissions.some(permission =>
    resource.permissions.some(resPermission => resPermission.name === permission.name)
  );
}

/**
 * Function to find the resource (route-method) from the database
 */
async function findResource(route, method) {
  // Fetch resource from the database based on route and method
  return await Resource.findOne({ route, method })
    .populate('permissions', 'name');  // Populate permissions for the resource
}

module.exports = authorize;
