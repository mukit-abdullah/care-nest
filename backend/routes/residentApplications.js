const express = require('express');
const router = express.Router();
const ResidentApplication = require('../models/ResidentApplication');
const { protect } = require('../middleware/auth');

// Submit new application (public route)
router.post('/', async (req, res) => {
    try {
        const application = new ResidentApplication(req.body);
        await application.save();
        res.status(201).json({ message: 'Application submitted successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Failed to submit application', error: error.message });
    }
});

// Get all applications (admin only)
router.get('/', protect, async (req, res) => {
    try {
        const applications = await ResidentApplication.find()
            .sort({ application_date: -1 });
        res.json(applications);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching applications', error: error.message });
    }
});

// Get specific application (admin only)
router.get('/:id', protect, async (req, res) => {
    try {
        const application = await ResidentApplication.findById(req.params.id);
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }
        res.json(application);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching application', error: error.message });
    }
});

// Update application status (admin only)
router.patch('/:id', protect, async (req, res) => {
    try {
        const { status, review_notes } = req.body;
        const application = await ResidentApplication.findByIdAndUpdate(
            req.params.id,
            {
                status,
                review_notes,
                reviewed_by: req.user._id,
                review_date: Date.now()
            },
            { new: true }
        );
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }
        res.json(application);
    } catch (error) {
        res.status(500).json({ message: 'Error updating application', error: error.message });
    }
});

module.exports = router;
