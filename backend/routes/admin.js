const express = require('express');
const router = express.Router();
const {
    registerAdmin,
    loginAdmin,
    getAdminProfile,
    updateAdminProfile,
    getAllAdmins,
    deleteAdmin,
    updateAdminStatus,
    updateAdminPermissions
} = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Public routes
router.post('/register', registerAdmin);
router.post('/login', loginAdmin);

// Protected routes
router.get('/profile', protect, getAdminProfile);
router.put('/profile', protect, updateAdminProfile);

// Super Admin only routes
router.get('/', protect, authorize('super_admin'), getAllAdmins);
router.delete('/:id', protect, authorize('super_admin'), deleteAdmin);
router.patch('/:id/status', protect, authorize('super_admin'), updateAdminStatus);
router.patch('/:id/permissions', protect, authorize('super_admin'), updateAdminPermissions);

module.exports = router;