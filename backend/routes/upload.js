const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { protect, authorize } = require('../middleware/authMiddleware');

// Configure multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        // Create unique filename with original extension
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

// Configure multer upload
const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        // Accept only image files
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    },
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});

// Helper function to delete old image
const deleteOldImage = (oldImagePath) => {
    if (!oldImagePath) return;

    // Extract filename from URL or path
    const filename = oldImagePath.split('/').pop();
    const fullPath = path.join(__dirname, '..', 'uploads', filename);

    // Check if file exists before deleting
    if (fs.existsSync(fullPath)) {
        try {
            fs.unlinkSync(fullPath);
            console.log('Old image deleted:', fullPath);
        } catch (error) {
            console.error('Error deleting old image:', error);
        }
    }
};

// Protected route for file upload
router.post('/', protect, authorize('admin', 'super_admin'), upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No file uploaded'
            });
        }

        // Delete old image if path is provided
        if (req.body.oldImagePath) {
            deleteOldImage(req.body.oldImagePath);
        }

        // Return the file path
        res.status(200).json({
            success: true,
            url: `/uploads/${req.file.filename}`
        });
    } catch (error) {
        // Delete uploaded file if there's an error
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;
