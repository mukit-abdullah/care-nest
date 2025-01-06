const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
    getAllMedicalRecords,
    getMedicalRecord,
    createMedicalRecord,
    updateMedicalRecord,
    deleteMedicalRecord
} = require('../controllers/medicalRecordController');

// Public routes
router.get('/', getAllMedicalRecords);
router.get('/:id', getMedicalRecord);

// Protected routes (admin only)
router.use(protect);
router.use(authorize('admin', 'super_admin'));

router.post('/', createMedicalRecord);
router.put('/:id', updateMedicalRecord);
router.delete('/:id', deleteMedicalRecord);

module.exports = router;
