const mongoose = require('mongoose');

const medicalRecordSchema = new mongoose.Schema({
    resident_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resident',
        required: true
    },
    blood_group: {
        type: String
    },
    medical_history: {
        type: String
    },
    medical_files_url: {
        type: [String],
        default: []
    },
    current_medication: {
        type: [String],
        default: []
    },
    physician_name: {
        type: String
    },
    physician_contact_number: {
        type: String
    },
    special_needs: {
        type: String
    },
    insurance_details: {
        type: String
    },
    insurance_files_url: {
        type: [String],
        default: []
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('MedicalRecord', medicalRecordSchema);
