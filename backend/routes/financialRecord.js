const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
    getAllFinancialRecords,
    getFinancialRecord,
    createFinancialRecord,
    updateFinancialRecord,
    deleteFinancialRecord
} = require('../controllers/financialRecordController');

// Public routes
router.get('/', getAllFinancialRecords);
router.get('/:id', getFinancialRecord);

// Protected routes (admin only)
router.use(protect);
router.use(authorize('admin', 'super_admin'));

router.post('/', createFinancialRecord);
router.put('/:id', updateFinancialRecord);
router.delete('/:id', deleteFinancialRecord);

module.exports = router;
