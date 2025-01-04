const express = require('express');
const router = express.Router();
const Resident = require('../models/Resident');

// Get all residents
router.get('/', async (req, res) => {
  try {
    const residents = await Resident.find();
    res.json(residents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single resident
router.get('/:id', async (req, res) => {
  try {
    const resident = await Resident.findById(req.params.id);
    if (resident) {
      res.json(resident);
    } else {
      res.status(404).json({ message: 'Resident not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new resident
router.post('/', async (req, res) => {
  const resident = new Resident(req.body);
  try {
    const newResident = await resident.save();
    res.status(201).json(newResident);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update resident
router.patch('/:id', async (req, res) => {
  try {
    const resident = await Resident.findById(req.params.id);
    if (resident) {
      Object.assign(resident, req.body);
      const updatedResident = await resident.save();
      res.json(updatedResident);
    } else {
      res.status(404).json({ message: 'Resident not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete resident
router.delete('/:id', async (req, res) => {
  try {
    const resident = await Resident.findById(req.params.id);
    if (resident) {
      await resident.remove();
      res.json({ message: 'Resident deleted' });
    } else {
      res.status(404).json({ message: 'Resident not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
