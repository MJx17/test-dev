const Resource = require('../models/resource');
const Role = require('../models/roles');
const Permission = require('../models/permissions');

/**
 * Get all resources
 */
const getAllResources = async (req, res) => {
  try {
    const resources = await Resource.find()
      .populate('roles', 'name') // Populate roles with their names
      .populate('permissions', 'name'); // Populate permissions with their names
    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching resources', error });
  }
};

/**
 * Register a new resource
 */
const createResource = async (req, res) => {
  const { route, method, roleNames = [], permissionNames = [] } = req.body;

  try {
    // Find roles and permissions by name
    const roles = await Role.find({ name: { $in: roleNames } });
    const permissions = await Permission.find({ name: { $in: permissionNames } });

    // Check if resource already exists
    const existingResource = await Resource.findOne({ route, method });
    if (existingResource) {
      return res.status(400).json({ message: 'Resource already exists' });
    }

    // Create and save the new resource with multiple roles and permissions
    const newResource = new Resource({
      route,
      method,
      roles: roles.map(role => role._id), // Save role _ids
      permissions: permissions.map(permission => permission._id), // Save permission _ids
    });

    await newResource.save();
    res.status(201).json({ message: 'Resource created successfully', newResource });
  } catch (error) {
    res.status(500).json({ message: 'Error creating resource', error });
  }
};

/**
 * Update a resource
 */
const updateResource = async (req, res) => {
  const { resourceId } = req.params;
  const { roleNames = [], permissionNames = [] } = req.body;

  try {
    // Find roles and permissions by name
    const roles = await Role.find({ name: { $in: roleNames } });
    const permissions = await Permission.find({ name: { $in: permissionNames } });

    // Update resource with new roles and permissions
    const updatedResource = await Resource.findByIdAndUpdate(
      resourceId,
      {
        roles: roles.map(role => role._id), // Update with multiple roles
        permissions: permissions.map(permission => permission._id), // Update with multiple permissions
      },
      { new: true }
    );

    if (!updatedResource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    res.json({ message: 'Resource updated successfully', updatedResource });
  } catch (error) {
    res.status(500).json({ message: 'Error updating resource', error });
  }
};

/**
 * Delete a resource
 */
const deleteResource = async (req, res) => {
  const { resourceId } = req.params;

  try {
    // Delete resource by ID
    const deletedResource = await Resource.findByIdAndDelete(resourceId);

    if (!deletedResource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    res.json({ message: 'Resource deleted successfully', deletedResource });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting resource', error });
  }
};

module.exports = {
  getAllResources,
  createResource,
  updateResource,
  deleteResource,
};

// const Resource = require('../models/resource');
// const Role = require('../models/roles');
// const Permission = require('../models/permissions');


// const getAllResources = async (req, res) => {
//   try {
//     const resources = await Resource.find()
//       .populate('roles', 'name')
//       .populate('permissions', 'name');
//     res.json(resources);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching resources', error });
//   }
// };

// /**
//  * Create a new resource with associated roles and permissions
//  */
// const createResource = async (req, res) => {
//   const { route, method, roleNames = [], permissionNames = [] } = req.body;

//   try {
//     // Find roles and permissions by name
//     const roles = await Role.find({ name: { $in: roleNames } });
//     const permissions = await Permission.find({ name: { $in: permissionNames } });

//     // Check if resource already exists
//     const existingResource = await Resource.findOne({ route, method });
//     if (existingResource) {
//       return res.status(400).json({ message: 'Resource already exists' });
//     }

//     // Create and save the new resource
//     const newResource = new Resource({
//       route,
//       method,
//       roles: roles.map(role => role._id),
//       permissions: permissions.map(permission => permission._id),
//     });

//     await newResource.save();
//     res.status(201).json({ message: 'Resource created successfully', newResource });
//   } catch (error) {
//     res.status(500).json({ message: 'Error creating resource', error });
//   }
// };

// const updateResource = async (req, res) => {
//   const { resourceId } = req.params;
//   const { roleNames = [], permissionNames = [] } = req.body;

//   try {
//     // Find roles and permissions by name
//     const roles = await Role.find({ name: { $in: roleNames } });
//     const permissions = await Permission.find({ name: { $in: permissionNames } });

//     // Update the resource with new roles and permissions
//     const updatedResource = await Resource.findByIdAndUpdate(
//       resourceId,
//       {
//         roles: roles.map(role => role._id),
//         permissions: permissions.map(permission => permission._id),
//       },
//       { new: true }
//     );

//     if (!updatedResource) {
//       return res.status(404).json({ message: 'Resource not found' });
//     }

//     res.json({ message: 'Resource updated successfully', updatedResource });
//   } catch (error) {
//     res.status(500).json({ message: 'Error updating resource', error });
//   }
// };


// const deleteResource = async (req, res) => {
//   const { resourceId } = req.params;

//   try {
//     // Delete the resource by its ID
//     const deletedResource = await Resource.findByIdAndDelete(resourceId);

//     if (!deletedResource) {
//       return res.status(404).json({ message: 'Resource not found' });
//     }

//     res.json({ message: 'Resource deleted successfully', deletedResource });
//   } catch (error) {
//     res.status(500).json({ message: 'Error deleting resource', error });
//   }
// };


  

// module.exports = {
//   getAllResources,
//   createResource,
//   deleteResource,
//   updateResource
// };
