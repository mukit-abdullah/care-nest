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
    default: 'BDT'
  },
  paymentMethod: {
    type: String,
    required: true
  },
  transactionId: {
    type: String,
    unique: true
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
