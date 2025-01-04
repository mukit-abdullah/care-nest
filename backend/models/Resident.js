const mongoose = require('mongoose');

const residentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true
  },
  contactInfo: {
    phone: String,
    email: String,
    address: String
  },
  emergencyContact: {
    name: String,
    relationship: String,
    phone: String,
    required: true
  },
  medicalHistory: [{
    condition: String,
    diagnosis: Date,
    medications: [String],
    notes: String
  }],
  dietaryPreferences: {
    restrictions: [String],
    allergies: [String],
    preferences: [String]
  },
  roomNumber: {
    type: String,
    required: true
  },
  admissionDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['Active', 'Discharged', 'Temporary Leave'],
    default: 'Active'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Resident', residentSchema);
