const express = require('express');
const router = express.Router();
const Service = require('../models/Service');

// Get all active services
router.get('/', async (req, res) => {
  try {
    const services = await Service.find({ isActive: true })
      .sort('order')
      .select('-__v');
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single service
router.get('/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id).select('-__v');
    if (service) {
      res.json(service);
    } else {
      res.status(404).json({ message: 'Service not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new service (protected route)
router.post('/', async (req, res) => {
  const service = new Service({
    title: req.body.title,
    description: req.body.description,
    image: req.body.image,
    features: req.body.features,
    order: req.body.order
  });

  try {
    const newService = await service.save();
    res.status(201).json(newService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a service (protected route)
router.patch('/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (service) {
      Object.keys(req.body).forEach(key => {
        service[key] = req.body[key];
      });
      const updatedService = await service.save();
      res.json(updatedService);
    } else {
      res.status(404).json({ message: 'Service not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a service (protected route)
router.delete('/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (service) {
      await service.remove();
      res.json({ message: 'Service deleted' });
    } else {
      res.status(404).json({ message: 'Service not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
