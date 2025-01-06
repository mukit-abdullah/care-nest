const mongoose = require('mongoose');

const dietSchema = new mongoose.Schema({
    resident_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resident',
        required: true
    },
    dietary_preference: {
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
    food_allergies: [String]
}, {
    timestamps: true
});

module.exports = mongoose.model('Diet', dietSchema);
