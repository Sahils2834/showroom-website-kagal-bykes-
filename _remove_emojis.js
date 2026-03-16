const fs = require('fs');
const path = require('path');

// Comprehensive emoji regex
const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{FE0F}\u{200D}\u{20E3}\u{E0020}-\u{E007F}]+/gu;

const baseDir = path.resolve(__dirname, 'frontend/src');
const files = [
  'pages/Services.jsx',
  'pages/Finance.jsx',
  'pages/Deliveries.jsx',
  'pages/Bikes.jsx',
  'pages/BikeDetails.jsx',
  'pages/Admin.jsx',
  'data/bikesData.js',
  'components/TestRideModal.jsx',
  'components/Sidebar.jsx',
  'components/ReviewSection.jsx',
  'components/QuoteCalculator.jsx',
  'components/Navbar.jsx',
  'components/Footer.jsx',
  'components/ExploreSection.jsx',
  'components/BikeComparison.jsx',
  'components/BikeCard.jsx',
  'components/AppointmentForm.jsx',
  'components/AccessoriesSection.jsx',
];

let totalCount = 0;

files.forEach(relPath => {
  const filePath = path.join(baseDir, relPath);
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const matches = content.match(emojiRegex);
    if (matches) {
      const count = matches.length;
      content = content.replace(emojiRegex, '');
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(path.basename(filePath) + ': removed ' + count + ' emoji(s)');
      totalCount += count;
    } else {
      console.log(path.basename(filePath) + ': no emojis found');
    }
  } catch (err) {
    console.error('Error with ' + relPath + ': ' + err.message);
  }
});

console.log('\nDone! Removed ' + totalCount + ' emojis total.');
