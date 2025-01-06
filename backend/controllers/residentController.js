const Resident = require('../models/Resident');
const Room = require('../models/Room');
const Guardian = require('../models/Guardian');
const MedicalRecord = require('../models/MedicalRecord');
const Diet = require('../models/Diet');
const FinancialRecord = require('../models/FinancialRecord');

// Create new resident with all related information
exports.createResident = async (req, res) => {
    try {
        const {
            residentData,
            roomData,
            guardianData,
            medicalData,
            dietData,
            financialData
        } = req.body;

        // Add admin reference to resident data
        residentData.created_by = req.admin.id;

        // Create resident
        const resident = await Resident.create(residentData);

        // Create room and link resident
        if (roomData) {
            roomData.resident_id = resident._id;
            await Room.create(roomData);
        }

        // Create guardian
        if (guardianData) {
            guardianData.resident_id = resident._id;
            await Guardian.create(guardianData);
        }

        // Create medical record
        if (medicalData) {
            medicalData.resident_id = resident._id;
            await MedicalRecord.create(medicalData);
        }

        // Create diet plan
        if (dietData) {
            dietData.resident_id = resident._id;
            await Diet.create(dietData);
        }

        // Create financial record
        if (financialData) {
            financialData.resident_id = resident._id;
            await FinancialRecord.create(financialData);
        }

        res.status(201).json({
            success: true,
            data: resident
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Get all residents
exports.getAllResidents = async (req, res) => {
    try {
        const residents = await Resident.find()
            .populate('created_by', 'username email');

        res.status(200).json({
            success: true,
            count: residents.length,
            data: residents
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Get single resident with all related information
exports.getResident = async (req, res) => {
    try {
        const resident = await Resident.findById(req.params.id)
            .populate('created_by', 'username email');

        if (!resident) {
            return res.status(404).json({
                success: false,
                message: 'Resident not found'
            });
        }

        // Get related information
        const room = await Room.findOne({ resident_id: resident._id });
        const guardian = await Guardian.findOne({ resident_id: resident._id });
        const medicalRecord = await MedicalRecord.findOne({ resident_id: resident._id });
        const diet = await Diet.findOne({ resident_id: resident._id });
        const financialRecord = await FinancialRecord.findOne({ resident_id: resident._id });

        res.status(200).json({
            success: true,
            data: {
                resident,
                room,
                guardian,
                medicalRecord,
                diet,
                financialRecord
            }
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Update resident and related information
exports.updateResident = async (req, res) => {
    try {
        const {
            residentData,
            roomData,
            guardianData,
            medicalData,
            dietData,
            financialData
        } = req.body;

        // Update resident
        const resident = await Resident.findByIdAndUpdate(
            req.params.id,
            residentData,
            { new: true, runValidators: true }
        );

        if (!resident) {
            return res.status(404).json({
                success: false,
                message: 'Resident not found'
            });
        }

        // Update room
        if (roomData) {
            await Room.findOneAndUpdate(
                { resident_id: resident._id },
                roomData,
                { new: true, runValidators: true }
            );
        }

        // Update guardian
        if (guardianData) {
            await Guardian.findOneAndUpdate(
                { resident_id: resident._id },
                guardianData,
                { new: true, runValidators: true }
            );
        }

        // Update medical record
        if (medicalData) {
            await MedicalRecord.findOneAndUpdate(
                { resident_id: resident._id },
                medicalData,
                { new: true, runValidators: true }
            );
        }

        // Update diet
        if (dietData) {
            await Diet.findOneAndUpdate(
                { resident_id: resident._id },
                dietData,
                { new: true, runValidators: true }
            );
        }

        // Update financial record
        if (financialData) {
            await FinancialRecord.findOneAndUpdate(
                { resident_id: resident._id },
                financialData,
                { new: true, runValidators: true }
            );
        }

        res.status(200).json({
            success: true,
            data: resident
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Delete resident and related information
exports.deleteResident = async (req, res) => {
    try {
        const resident = await Resident.findById(req.params.id);

        if (!resident) {
            return res.status(404).json({
                success: false,
                message: 'Resident not found'
            });
        }

        // Delete all related records
        await Room.deleteOne({ resident_id: resident._id });
        await Guardian.deleteOne({ resident_id: resident._id });
        await MedicalRecord.deleteOne({ resident_id: resident._id });
        await Diet.deleteOne({ resident_id: resident._id });
        await FinancialRecord.deleteOne({ resident_id: resident._id });

        // Delete resident
        await resident.remove();

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
