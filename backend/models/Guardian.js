const mongoose = require('mongoose');

const guardianSchema = new mongoose.Schema({
    resident_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resident',
        required: true
    },
    name: {
        type: String
    },
    relationship: {
        type: String
    },
    guardian_contact_number: {
        type: String
    },
    guardian_address: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Guardian', guardianSchema);
