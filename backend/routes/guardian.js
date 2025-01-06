const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
    getAllGuardians,
    getGuardian,
    createGuardian,
    updateGuardian,
    deleteGuardian
} = require('../controllers/guardianController');

// Public routes
router.get('/', getAllGuardians);
router.get('/:id', getGuardian);

// Protected routes (admin only)
router.use(protect);
router.use(authorize('admin', 'super_admin'));

router.post('/', createGuardian);
router.put('/:id', updateGuardian);
router.delete('/:id', deleteGuardian);

module.exports = router;
