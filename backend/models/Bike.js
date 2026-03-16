const mongoose = require('mongoose');

const bikeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: ['Commuter', 'Performance', 'Adventure', 'Premium', 'Scooter'],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      default: '',
    },
    engine: {
      type: String,
      default: '',
    },
    mileage: {
      type: String,
      default: '',
    },
    topSpeed: {
      type: String,
      default: '',
    },
    color: {
      type: [String],
      default: [],
    },
    description: {
      type: String,
      default: '',
    },
    features: {
      type: [String],
      default: [],
    },
    onRoad: {
      type: Number,
      default: 0,
    },
    discount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Bike', bikeSchema);
