const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');
const Admin = require('../models/Admin');
const path = require('path');

// Load env vars from the correct path
dotenv.config({ path: path.join(__dirname, '../.env') });

// Connect to DB
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
    } catch (error) {
        console.error('Error connecting to MongoDB:'.red, error.message);
        process.exit(1);
    }
};

// Super admin data
const superAdminData = {
    username: 'sadmin',
    email: 'superadmin@carenest.com',
    password: '',  // This will be hashed by the model, add password before run.
    role: 'super_admin',
    contact_number: '01712345678',
    status: 'active'
};

// Create super admin
const createSuperAdmin = async () => {
    try {
        await connectDB();

        // Check if super admin already exists
        const existingAdmin = await Admin.findOne({ email: superAdminData.email });
        
        if (existingAdmin) {
            console.log('Super admin already exists'.yellow);
            process.exit(0);
        }

        // Create super admin
        const superAdmin = await Admin.create(superAdminData);

        console.log('\nSuper admin created successfully'.green.bold);
        console.log('\nCredentials:'.cyan.bold);
        console.log('Email:'.cyan, superAdminData.email);
        console.log('Password:'.cyan, superAdminData.password);
        console.log('\nIMPORTANT:'.yellow.bold);
        console.log('Please change the password after first login'.yellow);
        console.log('This is a one-time setup script'.yellow);

        process.exit(0);
    } catch (error) {
        console.error('Error creating super admin:'.red, error.message);
        process.exit(1);
    }
};

createSuperAdmin();
