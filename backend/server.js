const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { MONGODB_URI, PORT } = require('./config');

// Import routes
const residentsRouter = require('./routes/residents');
const servicesRouter = require('./routes/services');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

// Routes
app.use('/api/residents', residentsRouter);
app.use('/api/services', servicesRouter);

// Basic route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to CareNest API',
    endpoints: {
      residents: '/api/residents',
      services: '/api/services'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
