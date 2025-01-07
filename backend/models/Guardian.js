const mongoose = require('mongoose');

const guardianSchema = new mongoose.Schema({
    resident_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resident',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    relationship: {
        type: String,
        required: true
    },
    contact_number: {
        type: String
    },
    address: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Guardian', guardianSchema);
