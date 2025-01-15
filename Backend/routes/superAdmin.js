const express = require('express');
const router = express.Router();
const roleController = require('../controller/roleController');
const authorize  = require('../middleware/sd');
// const { authenticateJWT, authorize } = require('../middleware/asd');

// // Permission Routes
// // Route: GET /permissions
// router.get('/permissions', 
//     authenticateJWT(['superadmin']),  // Authenticate JWT and check role 'superadmin'
//     roleController.getPermissions     // Proceed to the controller if authentication is successful
//   );

  // router.get('/permissions', 
  //   authorize([], ['view_content']), 
  //   roleController.getPermissions     
  // );



router.get('/permissions',  
    roleController.getPermissions     
  );

router.post('/permissions',  roleController.createPermission);
router.get('/permissions/:id', roleController.getPermissionById);
router.put('/permissions/:id', roleController.updatePermission);
router.patch('/permissions/:id', roleController.patchPermission);
router.delete('/permissions/:id', roleController.deletePermission)

// Role Routes
// router.post('/roles', roleController.createRole);
router.post('/create-roles',  authorize(),  roleController.createRole,);
// router.get(
//   '/roles',   // Ensure the user is authenticated
//   authorize([], ['view_content']),  // Check if the user has 'view_content' permission
//   roleController.getRoles // Your controller's method to handle the response
// );

router.get(
  '/roles',
  authorize(),  // No need to pass specific permissions/roles, it will check dynamically
  roleController.getRoles
);




router.get('/roles/signup',    roleController.getRolesForSignup);
router.get('/roles/:id', roleController.getRoleById);
router.put('/roles/:id', roleController.updateRole);
router.patch('/roles/:id', roleController.patchRole);
router.delete('/roles/:id', roleController.deleteRole);


// Add/remove permissions to/from role
router.put('/roles/:roleId/permissions', roleController.addPermissionsToRole);
router.delete('/roles/:roleId/permissions', roleController.removePermissionsFromRole);

// User Role Assignment
router.put('/users/:userId/role', roleController.assignRoleToUser);
router.get('/users/:userId/role-permissions', roleController.getUserRoleAndPermissions);

module.exports = router;
