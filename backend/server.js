const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');

// Load env vars
dotenv.config();

// Route files
const adminRoutes = require('./routes/admin');
const residentRoutes = require('./routes/resident');
const roomRoutes = require('./routes/room');
const guardianRoutes = require('./routes/guardian');
const medicalRecordRoutes = require('./routes/medicalRecord');
const dietRoutes = require('./routes/diet');
const financialRecordRoutes = require('./routes/financialRecord');

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Enable CORS
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Rate limiting
const limiter = rateLimit({
    windowMs: process.env.RATE_LIMIT_WINDOW_MS, // 15 minutes
    max: process.env.RATE_LIMIT_MAX_REQUESTS // limit each IP to 100 requests per windowMs
});

// Apply rate limiting to all routes
app.use(limiter);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Mount routers
app.use('/api/admin', adminRoutes);
app.use('/api/residents', residentRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/guardians', guardianRoutes);
app.use('/api/medical-records', medicalRecordRoutes);
app.use('/api/diets', dietRoutes);
app.use('/api/financial-records', financialRecordRoutes);

// Error handler
const errorHandler = require('./middleware/error');
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red);
    // Close server & exit process
    server.close(() => process.exit(1));
});
