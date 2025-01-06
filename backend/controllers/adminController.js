const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Helper function to generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};

// @desc    Register a new admin
// @route   POST /api/admin/register
// @access  Super Admin only
exports.registerAdmin = async (req, res) => {
    try {
        const {
            username,
            email,
            password,
            role,
            firstName,
            lastName,
            phoneNumber,
            address
        } = req.body;

        // Check if admin already exists
        const adminExists = await Admin.findOne({ $or: [{ email }, { username }] });
        if (adminExists) {
            return res.status(400).json({
                success: false,
                message: 'Admin already exists with this email or username'
            });
        }

        // Create new admin
        const admin = await Admin.create({
            username,
            email,
            password,
            role,
            personalInfo: {
                firstName,
                lastName,
                phoneNumber,
                address
            }
        });

        if (admin) {
            res.status(201).json({
                success: true,
                data: {
                    _id: admin._id,
                    username: admin.username,
                    email: admin.email,
                    role: admin.role,
                    token: generateToken(admin._id)
                }
            });
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Auth admin & get token
// @route   POST /api/admin/login
// @access  Public
exports.loginAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find admin by username
        const admin = await Admin.findOne({ username }).select('+password');
        
        if (!admin || !(await admin.matchPassword(password))) {
            return res.status(401).json({
                success: false,
                message: 'Invalid username or password'
            });
        }

        // Check if admin is active
        if (admin.status !== 'active') {
            return res.status(401).json({
                success: false,
                message: 'Your account is not active. Please contact super admin.'
            });
        }

        // Update last login
        admin.lastLogin = Date.now();
        admin.loginAttempts = 0;
        await admin.save();

        res.json({
            success: true,
            data: {
                _id: admin._id,
                username: admin.username,
                email: admin.email,
                role: admin.role,
                status: admin.status,
                token: generateToken(admin._id)
            }
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get admin profile
// @route   GET /api/admin/profile
// @access  Private
exports.getAdminProfile = async (req, res) => {
    try {
        const admin = await Admin.findById(req.admin.id);
        if (admin) {
            res.json({
                success: true,
                data: {
                    _id: admin._id,
                    username: admin.username,
                    email: admin.email,
                    role: admin.role,
                    personalInfo: admin.personalInfo,
                    permissions: admin.permissions
                }
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Admin not found'
            });
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Update admin profile
// @route   PUT /api/admin/profile
// @access  Private
exports.updateAdminProfile = async (req, res) => {
    try {
        const admin = await Admin.findById(req.admin.id);

        if (admin) {
            admin.username = req.body.username || admin.username;
            admin.email = req.body.email || admin.email;
            admin.personalInfo.firstName = req.body.firstName || admin.personalInfo.firstName;
            admin.personalInfo.lastName = req.body.lastName || admin.personalInfo.lastName;
            admin.personalInfo.phoneNumber = req.body.phoneNumber || admin.personalInfo.phoneNumber;
            admin.personalInfo.address = req.body.address || admin.personalInfo.address;

            if (req.body.password) {
                admin.password = req.body.password;
            }

            const updatedAdmin = await admin.save();

            res.json({
                success: true,
                data: {
                    _id: updatedAdmin._id,
                    username: updatedAdmin.username,
                    email: updatedAdmin.email,
                    role: updatedAdmin.role,
                    personalInfo: updatedAdmin.personalInfo,
                    token: generateToken(updatedAdmin._id)
                }
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Admin not found'
            });
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get all admins
// @route   GET /api/admin
// @access  Super Admin only
exports.getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.find({}).select('-password');
        res.json({
            success: true,
            count: admins.length,
            data: admins
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Delete admin
// @route   DELETE /api/admin/:id
// @access  Super Admin only
exports.deleteAdmin = async (req, res) => {
    try {
        const admin = await Admin.findById(req.params.id);

        if (admin) {
            if (admin.role === 'super_admin') {
                return res.status(400).json({
                    success: false,
                    message: 'Super Admin cannot be deleted'
                });
            }

            await admin.remove();
            res.json({
                success: true,
                message: 'Admin removed'
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Admin not found'
            });
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Update admin status
// @route   PATCH /api/admin/:id/status
// @access  Super Admin only
exports.updateAdminStatus = async (req, res) => {
    try {
        const admin = await Admin.findById(req.params.id);

        if (admin) {
            if (admin.role === 'super_admin') {
                return res.status(400).json({
                    success: false,
                    message: 'Super Admin status cannot be changed'
                });
            }

            admin.status = req.body.status;
            const updatedAdmin = await admin.save();

            res.json({
                success: true,
                data: updatedAdmin
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Admin not found'
            });
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Update admin permissions
// @route   PATCH /api/admin/:id/permissions
// @access  Super Admin only
exports.updateAdminPermissions = async (req, res) => {
    try {
        const admin = await Admin.findById(req.params.id);

        if (admin) {
            if (admin.role === 'super_admin') {
                return res.status(400).json({
                    success: false,
                    message: 'Super Admin permissions cannot be modified'
                });
            }

            admin.permissions = { ...admin.permissions, ...req.body.permissions };
            const updatedAdmin = await admin.save();

            res.json({
                success: true,
                data: updatedAdmin
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Admin not found'
            });
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
