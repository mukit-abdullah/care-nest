const Resident = require('../models/Resident');
const Room = require('../models/Room');
const Guardian = require('../models/Guardian');
const MedicalRecord = require('../models/MedicalRecord');
const Diet = require('../models/Diet');
const FinancialRecord = require('../models/FinancialRecord');
const mongoose = require('mongoose');

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

        // Check if room is available first
        if (roomData) {
            const existingRoom = await Room.findOne({
                room_number: roomData.room_number,
                room_type: roomData.room_type
            });

            if (existingRoom) {
                // For single rooms, check if it's already occupied
                if (roomData.room_type.toLowerCase() === 'single' && existingRoom.resident_id) {
                    throw new Error(`Room ${roomData.room_number} is already occupied. Single rooms can only have one resident.`);
                }
            }
        }

        // Add admin reference to resident data
        residentData.created_by = req.admin.id;

        let createdRecords = {};
        
        try {
            // Step 1: Create resident
            createdRecords.resident = await Resident.create(residentData);

            // Step 2: Create room if provided
            if (roomData) {
                roomData.resident_id = createdRecords.resident._id;
                createdRecords.room = await Room.create(roomData);
            }

            // Step 3: Create guardian if provided
            if (guardianData) {
                guardianData.resident_id = createdRecords.resident._id;
                createdRecords.guardian = await Guardian.create(guardianData);
            }

            // Step 4: Create medical record if provided
            if (medicalData) {
                medicalData.resident_id = createdRecords.resident._id;
                createdRecords.medical = await MedicalRecord.create(medicalData);
            }

            // Step 5: Create diet if provided
            if (dietData) {
                dietData.resident_id = createdRecords.resident._id;
                createdRecords.diet = await Diet.create(dietData);
            }

            // Step 6: Create financial record if provided
            if (financialData) {
                financialData.resident_id = createdRecords.resident._id;
                createdRecords.financial = await FinancialRecord.create(financialData);
            }

            // If we get here, all creations were successful
            res.status(201).json({
                success: true,
                data: createdRecords
            });

        } catch (error) {
            // If any creation fails after resident is created, clean up
            console.error('Error during record creation:', error);
            
            // Clean up any created records
            const cleanup = async () => {
                if (createdRecords.resident) {
                    await Resident.findByIdAndDelete(createdRecords.resident._id);
                }
                if (createdRecords.room) {
                    await Room.findByIdAndDelete(createdRecords.room._id);
                }
                if (createdRecords.guardian) {
                    await Guardian.findByIdAndDelete(createdRecords.guardian._id);
                }
                if (createdRecords.medical) {
                    await MedicalRecord.findByIdAndDelete(createdRecords.medical._id);
                }
                if (createdRecords.diet) {
                    await Diet.findByIdAndDelete(createdRecords.diet._id);
                }
                if (createdRecords.financial) {
                    await FinancialRecord.findByIdAndDelete(createdRecords.financial._id);
                }
            };

            await cleanup();
            throw new Error(`Failed to create resident records: ${error.message}`);
        }

    } catch (error) {
        console.error('Resident creation error:', error);
        res.status(400).json({
            success: false,
            message: error.message || 'Failed to create resident'
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

// Update resident status
exports.updateResidentStatus = async (req, res) => {
    try {
        const { status } = req.body;

        if (!status || !['active', 'inactive'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status value. Must be either "active" or "inactive"'
            });
        }

        const resident = await Resident.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        );

        if (!resident) {
            return res.status(404).json({
                success: false,
                message: 'Resident not found'
            });
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
