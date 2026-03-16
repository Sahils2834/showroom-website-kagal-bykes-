try {
  require('./config/db');
  require('./middleware/auth');
  require('./models/User');
  require('./models/Appointment');
  require('./models/Bike');
  require('./models/Review');
  require('./models/TestRide');
  require('./routes/auth');
  require('./routes/appointments');
  require('./routes/bikes');
  require('./routes/reviews');
  require('./routes/testrides');
  console.log('All modules loaded successfully!');
  process.exit(0);
} catch (e) {
  console.error('ERROR:', e.message);
  process.exit(1);
}
