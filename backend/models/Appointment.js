const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone is required'],
    },
    service_type: {
      type: String,
      enum: ['test-ride', 'service', 'finance', 'consultation'],
      default: 'test-ride',
    },
    bike_model: {
      type: String,
      required: [true, 'Bike model is required'],
    },
    preferred_date: {
      type: String,
      required: [true, 'Preferred date is required'],
    },
    message: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Appointment', appointmentSchema);
