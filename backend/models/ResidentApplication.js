const mongoose = require('mongoose');

const residentApplicationSchema = new mongoose.Schema({
    // Resident Information
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
    personal_contact_number: {
        type: String
    },
    address: {
        type: String
    },
    blood_group: {
        type: String
    },
    medical_history: {
        type: String
    },
    dietary_preferences: {
        type: String,
        enum: ['Vegetarian', 'Non-Vegetarian', 'Vegan'],
        required: true
    },
    food_category: {
        type: String,
        enum: ['Spicy', 'Non-Spicy'],
        required: true
    },
    food_texture: {
        type: String,
        enum: ['Hard', 'Soft'],
        required: true
    },
    room_type: {
        type: String,
        enum: ['Single', 'Shared'],
        required: true
    },

    // Guardian Information
    guardian_name: {
        type: String,
        required: true
    },
    guardian_relationship: {
        type: String,
        required: true
    },
    guardian_contact_number: {
        type: String,
        required: true
    },
    guardian_address: {
        type: String,
        required: true
    },

    // Financial Information
    payment_preference: {
        type: String,
        enum: ['Sponsored', 'Subscription'],
        required: true
    },

    // Application Status
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    application_date: {
        type: Date,
        default: Date.now
    },
    reviewed_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin'
    },
    review_date: {
        type: Date
    },
    review_notes: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('ResidentApplication', residentApplicationSchema);
