const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Resource = require('../models/resource');

const authorize = async (req, res, next) => {
    // Extract route path and method from the request object
    const { path: route, method } = req;
  
    try {
      // Ensure route and method are strings
      if (typeof route !== 'string' || typeof method !== 'string') {
        return res.status(400).json({ message: 'Invalid route or method type' });
      }
  
      // Step 1: Extract the access token from cookies
      const accessToken = req.cookies?.accessToken;
  
      if (!accessToken) {
        return res.status(401).json({
          error: 'Unauthorized',
          message: 'No token provided',
        });
      }
  
      // Step 2: Verify and decode the JWT token
      let decoded;
      try {
        decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
      } catch (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({
            error: 'Unauthorized',
            message: 'Token has expired',
          });
        }
        return res.status(401).json({
          error: 'Unauthorized',
          message: 'Invalid token',
        });
      }
  
      req.user = decoded;  // Attach decoded user data to request
      req.user._id = decoded.userId; // Ensure userId is attached properly
      req.user.role = decoded.role;  // Ensure role is attached to the user
  
      // Step 3: Fetch the user from the database using the userId (populating the role and permissions)
      const user = await User.findById(req.user._id).populate({
        path: 'role',
        populate: { path: 'permissions' },
      });
  
      if (!user) {
        return res.status(404).json({
          error: 'Not Found',
          message: 'User not found in the database',
        });
      }
  
      if (!user.role || !user.role.permissions) {
        return res.status(400).json({ message: 'User roles or permissions missing.' });
      }
  
      // Step 4: Use the checkUserPermissions function to check access
      const hasAccess = await checkUserPermissions(user, route, method);
  
      if (!hasAccess) {
        return res.status(403).json({ message: 'Access denied: insufficient permissions' });
      }
  
      // Step 5: Proceed to the next handler if authorized
      next();
    } catch (error) {
      console.error('Authorization Error:', error);
      return res.status(500).json({ message: 'Error in authorization', error: error.message });
    }
  };
  

/**
 * Function to check if the user has the necessary permissions for the resource
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

module.exports = { authorize };
