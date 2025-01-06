const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
    getAllDiets,
    getDiet,
    createDiet,
    updateDiet,
    deleteDiet
} = require('../controllers/dietController');

// Public routes
router.get('/', getAllDiets);
router.get('/:id', getDiet);

// Protected routes (admin only)
router.use(protect);
router.use(authorize('admin', 'super_admin'));

router.post('/', createDiet);
router.put('/:id', updateDiet);
router.delete('/:id', deleteDiet);

module.exports = router;
