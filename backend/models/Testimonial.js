const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  relation: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  image: {
    type: String
  },
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Testimonial', testimonialSchema);
