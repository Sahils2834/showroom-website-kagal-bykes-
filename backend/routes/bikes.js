const express = require('express');
const Bike = require('../models/Bike');
const { protect } = require('../middleware/auth');

const router = express.Router();

// ─── GET /api/bikes ─────────────────────────────────────────────────
// Get all bikes (public)
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const bikes = await Bike.find(filter).sort({ price: 1 });
    res.json(bikes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ─── GET /api/bikes/:id ─────────────────────────────────────────────
// Get single bike (public)
router.get('/:id', async (req, res) => {
  try {
    const bike = await Bike.findById(req.params.id);
    if (!bike) {
      return res.status(404).json({ message: 'Bike not found' });
    }
    res.json(bike);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ─── POST /api/bikes ────────────────────────────────────────────────
// Create a bike (protected — admin)
router.post('/', protect, async (req, res) => {
  try {
    const bike = await Bike.create(req.body);
    res.status(201).json(bike);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ─── PUT /api/bikes/:id ─────────────────────────────────────────────
// Update a bike (protected — admin)
router.put('/:id', protect, async (req, res) => {
  try {
    const bike = await Bike.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!bike) {
      return res.status(404).json({ message: 'Bike not found' });
    }
    res.json(bike);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ─── DELETE /api/bikes/:id ──────────────────────────────────────────
// Delete a bike (protected — admin)
router.delete('/:id', protect, async (req, res) => {
  try {
    const bike = await Bike.findByIdAndDelete(req.params.id);
    if (!bike) {
      return res.status(404).json({ message: 'Bike not found' });
    }
    res.json({ message: 'Bike deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
