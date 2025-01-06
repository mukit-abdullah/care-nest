const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
    getAllRooms,
    getRoom,
    createRoom,
    updateRoom,
    deleteRoom
} = require('../controllers/roomController');

// Public routes
router.get('/', getAllRooms);
router.get('/:room_number', getRoom);

// Protected routes (admin only)
router.use(protect);
router.use(authorize('admin', 'super_admin'));

router.post('/', createRoom);
router.put('/:room_number', updateRoom);
router.delete('/:room_number', deleteRoom);

module.exports = router;
