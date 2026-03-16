const express = require('express');
const Appointment = require('../models/Appointment');
const { protect, optionalAuth } = require('../middleware/auth');

const router = express.Router();

// ─── POST /api/appointments ─────────────────────────────────────────
// Create a new appointment (public, but attaches user_id if logged in)
router.post('/', optionalAuth, async (req, res) => {
  try {
    const { name, email, phone, service_type, bike_model, preferred_date, message } = req.body;

    const appointment = await Appointment.create({
      user_id: req.user?._id || null,
      name,
      email,
      phone,
      service_type,
      bike_model,
      preferred_date,
      message,
    });

    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ─── GET /api/appointments ──────────────────────────────────────────
// Get all appointments (protected — for admin use)
router.get('/', protect, async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .sort({ createdAt: -1 })
      .populate('user_id', 'fullName email');

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ─── GET /api/appointments/my ───────────────────────────────────────
// Get current user's appointments
router.get('/my', protect, async (req, res) => {
  try {
    const appointments = await Appointment.find({ user_id: req.user._id })
      .sort({ createdAt: -1 });

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ─── GET /api/appointments/:id ──────────────────────────────────────
router.get('/:id', protect, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ─── PUT /api/appointments/:id ──────────────────────────────────────
router.put('/:id', protect, async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ─── DELETE /api/appointments/:id ───────────────────────────────────
router.delete('/:id', protect, async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.json({ message: 'Appointment deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
