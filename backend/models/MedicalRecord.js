const mongoose = require('mongoose');

const medicalRecordSchema = new mongoose.Schema({
    resident_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resident',
        required: true
    },
    medical_history: {
        type: String,
        required: true
    },
    medical_files_url: [String],
    current_medication: [String],
    physician_name: {
        type: String,
        required: true
    },
    physician_contact_number: {
        type: String,
        required: true
    },
    special_needs: String,
    insurance_details: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('MedicalRecord', medicalRecordSchema);
