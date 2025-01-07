const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const {
    createResident,
    getAllResidents,
    getResident,
    updateResident,
    deleteResident
} = require('../controllers/residentController');

// Public routes
router.get('/', getAllResidents);
router.get('/:id', getResident);

// Protected routes (admin only)
router.use(protect);
router.use(authorize('admin', 'super_admin'));

router.post('/', createResident);
router.put('/:id', updateResident);
router.delete('/:id', deleteResident);

module.exports = router;
