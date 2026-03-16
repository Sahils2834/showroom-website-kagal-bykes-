const express = require('express');
const Review = require('../models/Review');
const { protect } = require('../middleware/auth');

const router = express.Router();

// ─── GET /api/reviews ───────────────────────────────────────────────
// Get all reviews (public)
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find()
      .sort({ created_at: -1 })
      .limit(20);
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ─── POST /api/reviews ──────────────────────────────────────────────
// Create a review (protected — must be logged in)
router.post('/', protect, async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const review = await Review.create({
      user_id: req.user._id,
      user_name: req.user.fullName || req.user.email.split('@')[0],
      rating,
      comment,
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ─── DELETE /api/reviews/:id ────────────────────────────────────────
// Delete own review (protected)
router.delete('/:id', protect, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Only allow owner to delete
    if (review.user_id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this review' });
    }

    await review.deleteOne();
    res.json({ message: 'Review deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
