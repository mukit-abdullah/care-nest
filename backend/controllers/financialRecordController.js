const FinancialRecord = require('../models/FinancialRecord');

// Get all financial records
exports.getAllFinancialRecords = async (req, res) => {
    try {
        const financialRecords = await FinancialRecord.find()
            .populate('resident_id', 'name');

        res.status(200).json({
            success: true,
            count: financialRecords.length,
            data: financialRecords
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Get single financial record
exports.getFinancialRecord = async (req, res) => {
    try {
        const financialRecord = await FinancialRecord.findById(req.params.id)
            .populate('resident_id', 'name personal_contact_number');

        if (!financialRecord) {
            return res.status(404).json({
                success: false,
                message: 'Financial record not found'
            });
        }

        res.status(200).json({
            success: true,
            data: financialRecord
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Create financial record
exports.createFinancialRecord = async (req, res) => {
    try {
        const financialRecord = await FinancialRecord.create(req.body);

        res.status(201).json({
            success: true,
            data: financialRecord
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Update financial record
exports.updateFinancialRecord = async (req, res) => {
    try {
        const financialRecord = await FinancialRecord.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!financialRecord) {
            return res.status(404).json({
                success: false,
                message: 'Financial record not found'
            });
        }

        res.status(200).json({
            success: true,
            data: financialRecord
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Delete financial record
exports.deleteFinancialRecord = async (req, res) => {
    try {
        const financialRecord = await FinancialRecord.findById(req.params.id);

        if (!financialRecord) {
            return res.status(404).json({
                success: false,
                message: 'Financial record not found'
            });
        }

        await financialRecord.remove();

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
