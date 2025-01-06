const Guardian = require('../models/Guardian');

// Get all guardians
exports.getAllGuardians = async (req, res) => {
    try {
        const guardians = await Guardian.find()
            .populate('resident_id', 'name');

        res.status(200).json({
            success: true,
            count: guardians.length,
            data: guardians
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Get single guardian
exports.getGuardian = async (req, res) => {
    try {
        const guardian = await Guardian.findById(req.params.id)
            .populate('resident_id', 'name personal_contact_number');

        if (!guardian) {
            return res.status(404).json({
                success: false,
                message: 'Guardian not found'
            });
        }

        res.status(200).json({
            success: true,
            data: guardian
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Create guardian
exports.createGuardian = async (req, res) => {
    try {
        const guardian = await Guardian.create(req.body);

        res.status(201).json({
            success: true,
            data: guardian
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Update guardian
exports.updateGuardian = async (req, res) => {
    try {
        const guardian = await Guardian.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!guardian) {
            return res.status(404).json({
                success: false,
                message: 'Guardian not found'
            });
        }

        res.status(200).json({
            success: true,
            data: guardian
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Delete guardian
exports.deleteGuardian = async (req, res) => {
    try {
        const guardian = await Guardian.findById(req.params.id);

        if (!guardian) {
            return res.status(404).json({
                success: false,
                message: 'Guardian not found'
            });
        }

        await guardian.remove();

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
