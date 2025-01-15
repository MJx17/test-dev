const { User } = require('../models/user');  // User model
const { Role } = require('../models/roles');  // Role model
const { Permission } = require('../models/permissions');  // Permission model

/**
 * Middleware to check permissions for CRUD operations.
 * @param {string} action - The CRUD action ('create', 'read', 'update', 'delete').
 */
const checkCrudPermission = (action) => {
  return async (req, res, next) => {
    try {
      // Fetch the permission for the given action from the database
      const permission = await Permission.findOne({ action });

      if (!permission) {
        return res.status(400).json({
          error: 'Invalid action',
          message: `The action '${action}' is not supported.`,
        });
      }

      const permissionName = permission.permissionName;

      // Fetch the user, including their role and permissions
      const user = await User.findById(req.user.userId).populate({
        path: 'role',
        populate: {
          path: 'permissions',
          model: 'Permission',
        },
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Check if the user's role has the required permission
      const userPermissions = user.role.permissions.map((perm) => perm.permissionName);

      if (!userPermissions.includes(permissionName)) {
        return res.status(403).json({
          error: 'Forbidden',
          message: `You do not have the '${permissionName}' permission to perform this action.`,
        });
      }

      next(); // User has the required permission
    } catch (error) {
      console.error('CRUD permission check error:', error);
      return res.status(500).json({
        error: 'Internal Server Error',
        message: 'An error occurred while checking permissions',
      });
    }
  };
};

module.exports = {
  checkCrudPermission,
};
