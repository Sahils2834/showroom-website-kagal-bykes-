const express = require('express');
const TestRide = require('../models/TestRide');
const { protect, optionalAuth } = require('../middleware/auth');

const router = express.Router();

// ─── POST /api/testrides ────────────────────────────────────────────
// Book a test ride (public, attaches user_id if logged in)
router.post('/', optionalAuth, async (req, res) => {
  try {
    const { name, email, phone, bike_model, preferred_date, message } = req.body;

    const testRide = await TestRide.create({
      user_id: req.user?._id || null,
      name,
      email,
      phone,
      bike_model,
      preferred_date,
      message,
    });

    res.status(201).json(testRide);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ─── GET /api/testrides ─────────────────────────────────────────────
// Get all test rides (protected — admin)
router.get('/', protect, async (req, res) => {
  try {
    const testRides = await TestRide.find()
      .sort({ createdAt: -1 })
      .populate('user_id', 'fullName email');

    res.json(testRides);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ─── GET /api/testrides/my ──────────────────────────────────────────
// Get current user's test rides
router.get('/my', protect, async (req, res) => {
  try {
    const testRides = await TestRide.find({ user_id: req.user._id })
      .sort({ createdAt: -1 });

    res.json(testRides);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ─── PUT /api/testrides/:id ─────────────────────────────────────────
router.put('/:id', protect, async (req, res) => {
  try {
    const testRide = await TestRide.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!testRide) {
      return res.status(404).json({ message: 'Test ride not found' });
    }
    res.json(testRide);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ─── DELETE /api/testrides/:id ──────────────────────────────────────
router.delete('/:id', protect, async (req, res) => {
  try {
    const testRide = await TestRide.findByIdAndDelete(req.params.id);
    if (!testRide) {
      return res.status(404).json({ message: 'Test ride not found' });
    }
    res.json({ message: 'Test ride deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
