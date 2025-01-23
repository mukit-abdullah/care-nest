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
const donationRoutes = require('./routes/donations');

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
const authLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 5, // limit each IP to 5 requests per windowMs
    message: { 
        success: false, 
        message: 'Too many login attempts. Please wait 5 minutes and try again.' 
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    handler: (req, res) => {
        res.status(429).json({ 
            success: false, 
            message: 'Too many login attempts. Please wait 5 minutes and try again.',
            retryAfter: Math.ceil(req.rateLimit.resetTime - Date.now()) / 1000
        });
    }
});

// Apply rate limiting to auth routes only
app.use('/api/admin/login', authLimiter);

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
app.use('/api/donations', donationRoutes);

// Error handler
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
