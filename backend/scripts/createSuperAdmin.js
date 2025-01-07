const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');

// Load env vars
dotenv.config({ path: '../.env' });

// Load Admin model
const Admin = require('../models/Admin');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/carenest', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const createSuperAdmin = async () => {
    try {
        // First, check if super admin already exists
        const existingAdmin = await Admin.findOne({ username: 'mukit' });
        
        if (existingAdmin) {
            console.log('Super admin already exists'.yellow);
            process.exit(0);
        }

        // Create super admin
        const superAdmin = await Admin.create({
            username: 'mukit',
            email: 'mukit@carenest.com',
            password: 'mukit55555',
            role: 'super_admin',
            contact_number: '01234567890',
            status: 'active'
        });

        console.log('Super Admin created successfully'.green);
        console.log('Username: mukit'.cyan);
        console.log('Password: mukit55555'.cyan);
        
    } catch (error) {
        console.error('Error creating super admin:'.red, error);
    } finally {
        process.exit(0);
    }
};

createSuperAdmin();
