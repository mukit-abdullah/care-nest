const mongoose = require('mongoose');

const residentSchema = new mongoose.Schema({
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    date_of_birth: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female'],
        required: true
    },
    photo_url: String,
    personal_contact_number: {
        type: String,
        
    },
    emergency_contact_name: {
        type: String,
        
    },
    emergency_contact_number: {
        type: String,
        
    },
    address: {
        type: String,
        
    },
    admission_date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'temporary_leave'],
        default: 'active'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Resident', residentSchema);
