const MedicalRecord = require('../models/MedicalRecord');

// Get all medical records
exports.getAllMedicalRecords = async (req, res) => {
    try {
        const medicalRecords = await MedicalRecord.find()
            .populate('resident_id', 'name');

        res.status(200).json({
            success: true,
            count: medicalRecords.length,
            data: medicalRecords
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Get single medical record
exports.getMedicalRecord = async (req, res) => {
    try {
        const medicalRecord = await MedicalRecord.findById(req.params.id)
            .populate('resident_id', 'name personal_contact_number');

        if (!medicalRecord) {
            return res.status(404).json({
                success: false,
                message: 'Medical record not found'
            });
        }

        res.status(200).json({
            success: true,
            data: medicalRecord
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Create medical record
exports.createMedicalRecord = async (req, res) => {
    try {
        const medicalRecord = await MedicalRecord.create(req.body);

        res.status(201).json({
            success: true,
            data: medicalRecord
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Update medical record
exports.updateMedicalRecord = async (req, res) => {
    try {
        const medicalRecord = await MedicalRecord.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!medicalRecord) {
            return res.status(404).json({
                success: false,
                message: 'Medical record not found'
            });
        }

        res.status(200).json({
            success: true,
            data: medicalRecord
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Delete medical record
exports.deleteMedicalRecord = async (req, res) => {
    try {
        const medicalRecord = await MedicalRecord.findById(req.params.id);

        if (!medicalRecord) {
            return res.status(404).json({
                success: false,
                message: 'Medical record not found'
            });
        }

        await medicalRecord.remove();

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
