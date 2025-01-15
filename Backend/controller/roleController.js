const Role = require('../models/roles');
const Permission = require('../models/permissions');
const User = require('../models/user');
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 0 });

const {AuditLog} = require('../utils/auditlog');  
// Controller to create a new permission
const createPermission = async (req, res) => {
  try {
    const { name, description, category } = req.body;

    // Validate request body
    if (!name || !description|| !category) {
      return res.status(400).json({ message: 'Name and description are required' });
    }

    // Create and save the new permission
    const newPermission = new Permission({ name, description, category });
    await newPermission.save();

    console.log('Permission created successfully.');

    // // Log the create action in the audit log
    // await AuditLog(
    //   'create',                  // action
    //   'permission',              // target
    //   newPermission._id,         // targetId
    //   req.user._id,              // userId (assumes user info is in req.user)
    //   { name, description }      // changes (details of the new permission)
    // );

    // console.log('Audit log saved.');

    // Respond with success
    res.status(201).json({   

      message: 'Permission created successfully',
      data: newPermission,
    });
  } catch (err) {
    // Handle errors
    console.error('Error creating permission:', err);
    res.status(500).json({ message: 'Error creating permission', error: err });
  }
};

// Controller to get all permissions
const getPermissions = async (req, res) => {
  try {
    // Fetch all permissions from the database
    const permissions = await Permission.find();

    console.log('Permissions fetched from the database.');

    // Log the view action in the audit log
    // await AuditLog(
    //   'view',  // action
    //   'permission',  // target
    //   null,  // targetId (no specific ID as this is a view-all action)
    //   req.user._id,  // userId
    //   null  // changes (no changes for view action)
    // );

    console.log('Audit log saved.');

    // Respond with the list of permissions
    res.status(200).json(permissions);
  } catch (err) {
    // Handle any errors during the fetch operation
    console.error('Error fetching permissions:', err);
    res.status(500).json({ message: 'Error fetching permissions', error: err });
  }
};


// Controller to get a specific permission by ID
// Controller to get a permission by ID
const getPermissionById = async (req, res) => {
  try {
    const permission = await Permission.findById(req.params.id);
    if (!permission) {
      return res.status(404).json({ message: 'Permission not found' });
    }

    console.log('Permission fetched successfully.');

    // Log the view action in the audit log
    // await AuditLog(
    //   'view',                  // action
    //   'permission',            // target
    //   permission._id,          // targetId
    //   req.user._id,            // userId
    //   null                     // changes (no changes for view action)
    // );

    // console.log('Audit log saved.');

    // Respond with the permission
    res.status(200).json(permission);
  } catch (err) {
    console.error('Error fetching permission:', err);
    res.status(500).json({ message: 'Error fetching permission', error: err });
  }
};

// Controller to update a permission by ID
const updatePermission = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Validate request body
    if (!name || !description) {
      return res.status(400).json({ message: 'Name and description are required' });
    }

    // Find and update the permission
    const permission = await Permission.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true } // Return the updated document
    );

    if (!permission) {
      return res.status(404).json({ message: 'Permission not found' });
    }

    console.log('Permission updated successfully.');

    // // Log the update action in the audit log
    // await AuditLog(
    //   'update',               // action
    //   'permission',           // target
    //   permission._id,         // targetId
    //   req.user._id,           // userId
    //   { name, description }   // changes (updated fields)
    // );

    console.log('Audit log saved.');

    // Respond with the updated permission
    res.status(200).json(permission);
  } catch (err) {
    console.error('Error updating permission:', err);
    res.status(500).json({ message: 'Error updating permission', error: err });
  }
};


// Controller to update a permission (patch)
const patchPermission = async (req, res) => {
  try {
    const { permissionId } = req.params;
    const { name, description } = req.body;

    // Find the permission by ID
    const permission = await Permission.findById(permissionId);
    if (!permission) {
      return res.status(404).json({ message: 'Permission not found' });
    }

    // Store the original values for the audit log
    const originalData = { name: permission.name, description: permission.description };

    // Update fields if provided
    if (name) permission.name = name;
    if (description) permission.description = description;

    // Save the updated permission
    await permission.save();

    console.log('Permission updated successfully.');

    // // Log the update action in the audit log
    // await AuditLog(
    //   'update',                // action
    //   'permission',            // target
    //   permission._id,          // targetId
    //   req.user._id,            // userId
    //   { originalData, updatedData: { name, description } } // changes
    // );

    console.log('Audit log saved.');

    res.status(200).json({
      message: 'Permission updated successfully',
      data: permission,
    });
  } catch (err) {
    console.error('Error updating permission:', err);
    res.status(500).json({ message: 'Error updating permission', error: err });
  }
};

// Controller to delete a permission
const deletePermission = async (req, res) => {
  try {
    const { permissionId } = req.params;

    // Find the permission by ID
    const permission = await Permission.findById(permissionId);

    if (!permission) {
      return res.status(404).json({ message: 'Permission not found' });
    }

    // Log the delete action in the audit log before deletion
    // await AuditLog(
    //   'delete',                // action
    //   'permission',            // target
    //   permission._id,          // targetId
    //   req.user._id,            // userId
    //   { name: permission.name, description: permission.description } // changes (deleted data)
    // );

    console.log('Audit log saved.');

    // Delete the permission
    await Permission.findByIdAndDelete(permissionId);

    res.status(200).json({ message: 'Permission deleted successfully' });
  } catch (err) {
    console.error('Error deleting permission:', err);
    res.status(500).json({ message: 'Error deleting permission', error: err });
  }
};


// const createRole = async (req, res) => {
//   try {
//     const { name } = req.body;

//     // Ensure the role name is provided
//     if (!name) {
//       return res.status(400).json({ message: 'Role name is required' });
//     }

//     // Create the new role
//     const newRole = new Role({ name, permissions: [] });
//     await newRole.save();

//     // Update the cache with the newly created role data
//     const updatedRoleData = { 
//       role: newRole.name.toLowerCase(), 
//       permissions: newRole.permissions.map(perm => perm.name)
//     };
//     cache.set(`role-${newRole._id}`, updatedRoleData);

//     res.status(201).json({
//       message: 'Role created successfully',
//       data: newRole,
//     });
//   } catch (err) {
//     console.error('Error creating role:', err);
//     res.status(500).json({ message: 'Error creating role', error: err });
//   }
// };

const createRole = async (req, res) => {
  try {
    const { name } = req.body;

    // Ensure the role name is provided
    if (!name) {
      return res.status(400).json({ message: 'Role name is required' });
    }

    // Create the new role
    const newRole = new Role({ name, permissions: [] }); // Initialize with empty permissions
    await newRole.save();

    console.log('Role created successfully.');

    // Log the creation action in the audit log
    await AuditLog(
      'create',                // action
      'role',                  // target
      newRole._id,             // targetId
      req.user._id,            // userId
      null        // changes (new role data)
    );

    console.log('Audit log saved.');

    res.status(201).json({
      message: 'Role created successfully',
      data: newRole,
    });
  } catch (err) {
    console.error('Error creating role:', err);
    res.status(500).json({ message: 'Error creating role', error: err });
  }
};


// Controller to get all roles
const getRoles = async (req, res) => {
  try {
    const roles = await Role.find().populate('permissions');

    // Log the view action in the audit log
    // await AuditLog(
    //   'view',               // action
    //   'role',               // target
    //   null,                 // targetId (no specific ID, viewing all roles)
    //   req.user._id,         // userId
    //   null                  // changes (no changes for a view action)
    // );

    console.log('Audit log saved for viewing all roles.');
    res.status(200).json(roles);
  } catch (err) {
    console.error('Error fetching roles:', err);
    res.status(500).json({ message: 'Error fetching roles', error: err });
  }
};


// Controller to get all roles excluding SuperAdmin for signup
const getRolesForSignup = async (req, res) => {
  try {
    const roles = await Role.find({ name: { $ne: 'superadmin' } }).populate('permissions');

    // Log the view action in the audit log
    // await AuditLog(
    //   'view',               // action
    //   'role',               // target
    //   null,                 // targetId (no specific ID, viewing filtered roles)
    //   req.user._id,         // userId
    //   { exclude: 'superadmin' }  // changes (log the excluded filter for clarity)
    // );

    console.log('Audit log saved for viewing roles excluding superadmin.');
    res.status(200).json(roles);
  } catch (err) {
    console.error('Error fetching roles for signup:', err);
    res.status(500).json({ message: 'Error fetching roles', error: err });
  }
};


// Controller to get a specific role by ID
const getRoleById = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id).populate('permissions');
    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }

    // Log the view action in the audit log
    // await AuditLog(
    //   'view',               // action
    //   'role',               // target
    //   role._id,             // targetId (specific role ID)
    //   req.user._id,         // userId
    //   null                  // changes (no changes for a view action)
    // );

    console.log(`Audit log saved for viewing role with ID ${role._id}.`);
    res.status(200).json(role);
  } catch (err) {
    console.error('Error fetching role by ID:', err);
    res.status(500).json({ message: 'Error fetching role', error: err });
  }
};


// Controller to update a role by ID
const updateRole = async (req, res) => {
  try {
    const { name, permissions } = req.body;

    if (!name || !Array.isArray(permissions)) {
      return res.status(400).json({ message: 'Role name and permissions are required' });
    }

    const permissionDocs = await Permission.find({ _id: { $in: permissions } });
    if (permissionDocs.length !== permissions.length) {
      return res.status(400).json({ message: 'Some permissions do not exist' });
    }

    const role = await Role.findById(req.params.id);
    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }

    const oldRoleData = { name: role.name, permissions: role.permissions };

    // Update the role
    role.name = name;
    role.permissions = permissions;
    await role.save();

    // Log the update action in the audit log
    // await AuditLog(
    //   'update',                       // action
    //   'role',                         // target
    //   role._id,                       // targetId
    //   req.user._id,                   // userId
    //   { old: oldRoleData, new: { name, permissions } } // changes
    // );

    console.log(`Audit log saved for updating role with ID ${role._id}.`);
    res.status(200).json(role);
  } catch (err) {
    console.error('Error updating role:', err);
    res.status(500).json({ message: 'Error updating role', error: err });
  }
};


// Controller to update a role (patch)
const patchRole = async (req, res) => {
  try {
    const { roleId } = req.params;
    const { name, permissions } = req.body;

    const role = await Role.findById(roleId);
    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }

    const oldRoleData = { name: role.name, permissions: role.permissions };

    if (name) role.name = name;
    if (permissions) {
      const permissionDocs = await Permission.find({ _id: { $in: permissions } });
      if (permissionDocs.length !== permissions.length) {
        return res.status(400).json({ message: 'Some permissions do not exist' });
      }
      role.permissions = [...new Set([...role.permissions, ...permissions])];
    }

    await role.save();

    // Log the partial update in the audit log
    // await AuditLog(
    //   'update',                        // action
    //   'role',                          // target
    //   role._id,                        // targetId
    //   req.user._id,                    // userId
    //   { old: oldRoleData, new: { name: role.name, permissions: role.permissions } } // changes
    // );

    console.log(`Audit log saved for patching role with ID ${role._id}.`);
    res.status(200).json({
      message: 'Role updated successfully',
      data: role,
    });
  } catch (err) {
    console.error('Error patching role:', err);
    res.status(500).json({ message: 'Error updating role', error: err });
  }
};

const deleteRole = async (req, res) => {
  try {
    const { roleId } = req.params;

    const role = await Role.findById(roleId);
    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }

    const roleData = { name: role.name, permissions: role.permissions };

    // Delete the role
    await Role.findByIdAndDelete(roleId);

    // // Log the delete action in the audit log
    // await AuditLog(
    //   'delete',              // action
    //   'role',                // target
    //   roleId,                // targetId
    //   req.user._id,          // userId
    //   { deleted: roleData }  // changes
    // );

    console.log(`Audit log saved for deleting role with ID ${roleId}.`);
    res.status(200).json({ message: 'Role deleted successfully' });
  } catch (error) {
    console.error('Error deleting role:', error);
    res.status(500).json({ message: 'Error deleting role', error });
  }
};


// Controller to add permissions to an existing role


const addPermissionsToRole = async (req, res) => {
  try {
    const { roleId } = req.params;
    const { permissions } = req.body;

    const role = await Role.findById(roleId);
    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }

    const permissionDocs = await Permission.find({ _id: { $in: permissions } });
    if (permissionDocs.length !== permissions.length) {
      return res.status(400).json({ message: 'Some permissions do not exist' });
    }

    const existingPermissions = role.permissions.filter((perm) =>
      permissions.includes(perm.toString())
    );

    if (existingPermissions.length > 0) {
      return res.status(400).json({
        message: 'Some permissions already exist in the role',
        existingPermissions,
      });
    }

    const previousPermissions = [...role.permissions];

    // Add new permissions to the role
    role.permissions = [...new Set([...role.permissions, ...permissions])];
    await role.save();

    // Log the action
    // await AuditLog(
    //   'add',                          // action
    //   'role',                          // target
    //   role._id,                        // targetId
    //   req.user._id,                    // userId
    //   { addedPermissions: permissions },  // changes
    //   { previousPermissions: previousPermissions } // previous values
    // );

    res.status(200).json({ message: 'Permissions added successfully', role });
  } catch (err) {
    res.status(500).json({ message: 'Error adding permissions to role', error: err });
  }
};


// Controller to remove permissions from a role
const removePermissionsFromRole = async (req, res) => {
  try {
    const { roleId } = req.params;
    const { permissions } = req.body;

    const role = await Role.findById(roleId);
    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }

    const previousPermissions = [...role.permissions];

    // Remove specified permissions from the role
    role.permissions = role.permissions.filter(
      (permission) => !permissions.includes(permission.toString())
    );
    await role.save();

    // Log the action
    // await AuditLog(
    //   'remove',                       // action
    //   'role',                          // target
    //   role._id,                        // targetId
    //   req.user._id,                    // userId
    //   { removedPermissions: permissions },  // changes
    //   { previousPermissions: previousPermissions } // previous values
    // );

    res.status(200).json(role);
  } catch (err) {
    res.status(500).json({ message: 'Error removing permissions from role', error: err });
  }
};

// Controller to reassign a role to a user
const assignRoleToUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { roleId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const role = await Role.findById(roleId);
    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }

    const previousRole = user.role;
    const previousPermissions = user.permissions;

    // Assign role and permissions to the user
    user.role = role._id;
    user.permissions = role.permissions;
    await user.save();

    // Log the action
    // await AuditLog(
    //   'assign',                        // action
    //   'user',                           // target
    //   user._id,                         // targetId
    //   req.user._id,                     // userId
    //   { assignedRole: role._id, assignedPermissions: role.permissions }, // changes
    //   { previousRole, previousPermissions } // previous values
    // );

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error assigning role to user', error: err });
  }
};

const getUserRoleAndPermissions = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).populate('role').populate('permissions');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Log the action
    // await AuditLog(
    //   'fetch',                       // action
    //   'user',                         // target
    //   user._id,                       // targetId
    //   req.user._id,                   // userId
    //   { role: user.role, permissions: user.permissions }, // changes
    //   null                            // no previous values for fetch action
    // );

    res.status(200).json({
      role: user.role,
      permissions: user.permissions,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user role and permissions', error: err });
  }
};


module.exports = {
  createPermission,
  getPermissions,
  getPermissionById,
  updatePermission,
  patchPermission,
  deletePermission,
  createRole,
  getRoles,
  getRolesForSignup,
  getRoleById,
  updateRole,
  patchRole,
  deleteRole,
  addPermissionsToRole,
  removePermissionsFromRole,
  assignRoleToUser,
  getUserRoleAndPermissions,
};
