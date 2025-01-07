const mongoose = require('mongoose');
const Admin = require('../models/Admin');
require('dotenv').config();

async function fixAdmin() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Find your admin account
        const admin = await Admin.findOne({ username: process.argv[2] });
        
        if (!admin) {
            console.error('Admin not found');
            process.exit(1);
        }

        console.log('Current admin status:', admin.status);
        
        // Update status to active
        admin.status = 'active';
        await admin.save();
        
        console.log('Admin status updated to active');
        console.log('Updated admin:', {
            username: admin.username,
            email: admin.email,
            role: admin.role,
            status: admin.status
        });

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
        process.exit(0);
    }
}

fixAdmin();
