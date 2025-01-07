const mongoose = require('mongoose');
const colors = require('colors');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
            socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);

        // Handle connection errors after initial connection
        mongoose.connection.on('error', err => {
            console.error(`MongoDB connection error: ${err}`.red.bold);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected'.yellow);
        });

        mongoose.connection.on('reconnected', () => {
            console.log('MongoDB reconnected'.green);
        });

    } catch (error) {
        console.error(`Error: ${error.message}`.red.underline.bold);
        process.exit(1);
    }
};

module.exports = connectDB;
