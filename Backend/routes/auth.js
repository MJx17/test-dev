const express = require('express');
const router = express.Router();
const { loginUser, createUser, logoutUser, refreshToken } = require('../controller/userController');
const { authenticateJWT } = require('../middleware/checkPermission');

// Login route (accessible by everyone)
router.post('/login', loginUser);

// Create user route (only accessible by SuperAdmin)
router.post('/create-user', authenticateJWT(['superadmin']), createUser);

router.post('/refresh-token', refreshToken) ;
router.post('/logout', logoutUser);

// Admin users route (accessible by Admin and SuperAdmin)
// router.get('/admin-users', authenticateJWT, authorize(['admin', 'superadmin']), getAdminUsers);

// // Other Admin or SuperAdmin routes
// // Example: Admins can access some other admin-related actions
// router.post('/admin-action', authenticateJWT, authorize(['admin', 'superadmin']), performAdminAction);

module.exports = router;
