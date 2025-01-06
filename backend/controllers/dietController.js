const Diet = require('../models/Diet');

// Get all diets
exports.getAllDiets = async (req, res) => {
    try {
        const diets = await Diet.find()
            .populate('resident_id', 'name');

        res.status(200).json({
            success: true,
            count: diets.length,
            data: diets
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Get single diet
exports.getDiet = async (req, res) => {
    try {
        const diet = await Diet.findById(req.params.id)
            .populate('resident_id', 'name personal_contact_number');

        if (!diet) {
            return res.status(404).json({
                success: false,
                message: 'Diet not found'
            });
        }

        res.status(200).json({
            success: true,
            data: diet
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Create diet
exports.createDiet = async (req, res) => {
    try {
        const diet = await Diet.create(req.body);

        res.status(201).json({
            success: true,
            data: diet
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Update diet
exports.updateDiet = async (req, res) => {
    try {
        const diet = await Diet.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!diet) {
            return res.status(404).json({
                success: false,
                message: 'Diet not found'
            });
        }

        res.status(200).json({
            success: true,
            data: diet
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Delete diet
exports.deleteDiet = async (req, res) => {
    try {
        const diet = await Diet.findById(req.params.id);

        if (!diet) {
            return res.status(404).json({
                success: false,
                message: 'Diet not found'
            });
        }

        await diet.remove();

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
