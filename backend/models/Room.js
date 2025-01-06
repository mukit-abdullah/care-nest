const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    room_number: {
        type: String,
        required: true,
        unique: true
    },
    resident_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resident'
    },
    room_type: {
        type: String,
        enum: ['single', 'shared'],
        required: true
    },
    special_facilities: [{
        type: String
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Room', roomSchema);
