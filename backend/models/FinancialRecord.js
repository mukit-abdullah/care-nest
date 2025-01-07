const mongoose = require('mongoose');

const financialRecordSchema = new mongoose.Schema({
    resident_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resident',
        required: true
    },
    payment_preference: {
        type: String,
        enum: ['Sponsored', 'Subscription'],
        required: true
    },
    account_number: {
        type: String,
        
    },
    payment_details: {
        type: String,
        
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('FinancialRecord', financialRecordSchema);
