const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  donor: {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    phone: String,
    address: String
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  currency: {
    type: String,
    default: 'USD'
  },
  purpose: {
    type: String,
    enum: ['General', 'Medical', 'Food', 'Infrastructure', 'Activities', 'Other'],
    default: 'General'
  },
  paymentMethod: {
    type: String,
    required: true
  },
  transactionId: {
    type: String,
    unique: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Completed', 'Failed', 'Refunded'],
    default: 'Pending'
  },
  isAnonymous: {
    type: Boolean,
    default: false
  },
  message: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Donation', donationSchema);
