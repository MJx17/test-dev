const Resource = require('../models/resource');
const Role = require('../models/roles');
const Permission = require('../models/permissions');

/**
 * Utility to register a resource dynamically
 * @param {String} route - The route to register (e.g., '/roles')
 * @param {String} method - The HTTP method (e.g., 'GET')
 * @param {Array} roleNames - List of role names to associate (e.g., ['Admin', 'Editor'])
 * @param {Array} permissionNames - List of permission names to associate (e.g., ['view_roles'])
 */
const registerResource = async ({ route, method, roleNames = [], permissionNames = [] }) => {
  const roles = await Role.find({ name: { $in: roleNames } });
  const permissions = await Permission.find({ name: { $in: permissionNames } });

  const existingResource = await Resource.findOne({ route, method });
  if (existingResource) {
    // If resource already exists, update the permissions and roles
    existingResource.roles = roles.map(role => role._id);
    existingResource.permissions = permissions.map(permission => permission._id);
    await existingResource.save();
    console.log('Resource updated dynamically:', existingResource);
    return;
  }

  const newResource = new Resource({
    route,
    method,
    roles: roles.map(role => role._id),
    permissions: permissions.map(permission => permission._id),
  });

  await newResource.save();
  console.log('Resource registered dynamically:', newResource);
};

module.exports = registerResource;
