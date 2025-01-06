const Room = require('../models/Room');

// Get all rooms
exports.getAllRooms = async (req, res) => {
    try {
        const rooms = await Room.find().populate('resident_id', 'name');

        res.status(200).json({
            success: true,
            count: rooms.length,
            data: rooms
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Get single room
exports.getRoom = async (req, res) => {
    try {
        const room = await Room.findOne({ room_number: req.params.room_number })
            .populate('resident_id', 'name personal_contact_number');

        if (!room) {
            return res.status(404).json({
                success: false,
                message: 'Room not found'
            });
        }

        res.status(200).json({
            success: true,
            data: room
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Create room
exports.createRoom = async (req, res) => {
    try {
        const room = await Room.create(req.body);

        res.status(201).json({
            success: true,
            data: room
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Update room
exports.updateRoom = async (req, res) => {
    try {
        const room = await Room.findOneAndUpdate(
            { room_number: req.params.room_number },
            req.body,
            { new: true, runValidators: true }
        );

        if (!room) {
            return res.status(404).json({
                success: false,
                message: 'Room not found'
            });
        }

        res.status(200).json({
            success: true,
            data: room
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Delete room
exports.deleteRoom = async (req, res) => {
    try {
        const room = await Room.findOne({ room_number: req.params.room_number });

        if (!room) {
            return res.status(404).json({
                success: false,
                message: 'Room not found'
            });
        }

        // Check if room has resident
        if (room.resident_id) {
            return res.status(400).json({
                success: false,
                message: 'Cannot delete room with assigned resident'
            });
        }

        await room.remove();

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
