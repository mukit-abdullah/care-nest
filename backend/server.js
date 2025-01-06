const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');

// Route files
const adminRoutes = require('./routes/admin');
const residentRoutes = require('./routes/resident');
const roomRoutes = require('./routes/room');
const guardianRoutes = require('./routes/guardian');
const medicalRecordRoutes = require('./routes/medicalRecord');
const dietRoutes = require('./routes/diet');
const financialRecordRoutes = require('./routes/financialRecord');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Enable CORS
app.use(cors());

// Mount routers
app.use('/api/admin', adminRoutes);
app.use('/api/residents', residentRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/guardians', guardianRoutes);
app.use('/api/medical-records', medicalRecordRoutes);
app.use('/api/diets', dietRoutes);
app.use('/api/financial-records', financialRecordRoutes);

// Debug route
app.get('/debug/routes', (req, res) => {
    const routes = [];
    app._router.stack.forEach((middleware) => {
        if (middleware.route) {
            routes.push({
                path: middleware.route.path,
                methods: Object.keys(middleware.route.methods)
            });
        } else if (middleware.name === 'router') {
            middleware.handle.stack.forEach((handler) => {
                if (handler.route) {
                    routes.push({
                        path: handler.route.path,
                        methods: Object.keys(handler.route.methods)
                    });
                }
            });
        }
    });
    res.json(routes);
});

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
    PORT,
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
    )
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red);
    // Close server & exit process
    server.close(() => process.exit(1));
});
