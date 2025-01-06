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

// Admin data
const adminData = {
    username: 'mukit',
    email: 'mukit@carenest.com',
    password: '',//write password here, dont save, gitgub finds it
    role: 'admin',
    contact_number: '01812345678',
    status: 'active'
};

// Create admin
const createAdmin = async () => {
    try {
        await connectDB();

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ 
            $or: [
                { email: adminData.email },
                { username: adminData.username }
            ] 
        });
        
        if (existingAdmin) {
            console.log('Admin already exists with this email or username'.yellow);
            process.exit(0);
        }

        // Create admin
        const admin = await Admin.create(adminData);

        console.log('\nAdmin created successfully'.green.bold);
        console.log('\nCredentials:'.cyan.bold);
        console.log('Username:'.cyan, admin.username);
        console.log('Password:'.cyan, adminData.password, '(unhashed)');
        console.log('Email:'.cyan, admin.email);
        console.log('Role:'.cyan, admin.role);
        console.log('\nPlease save these credentials securely.'.yellow);

        process.exit(0);
    } catch (error) {
        console.error('Error creating admin:'.red, error.message);
        process.exit(1);
    }
};

createAdmin();