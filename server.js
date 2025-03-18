const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/qore-app', {});

// Middleware
app.use(bodyParser.json());
app.use(cors());

const path = require('path');
// Serve Static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('*', (req, res) => {
  // res.send('QORE App Backend Server');
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const User = require('./models/User');

// Register user route
app.post('/register', (req, res) => {
  const { name, email } = req.body;

  // Create a new user document
  const user = new User({ name, email });

  // Save the user document to the database
  user.save((err) => {
    if (err) {
      res.status(500).send({ message: 'Error registering user' });
    } else {
      res.send({ message: 'User registered successfully' });
    }
  });
});

const QRCode = require('qrcode');

// Generate QR code route
app.post('/generate-qr-code', (req, res) => {
  const { userId } = req.body;

  // Generate a QR code
  QRCode.toDataURL(userId, (err, qrCode) => {
    if (err) {
      res.status(500).send({ message: 'Error generating QR code' });
    } else {
      res.send({ qrCode });
    }
  });
});

// Authenticate route
app.post('/authenticate', (req, res) => {
  const { qrCode } = req.body;

  // Find the user associated with the QR code
  User.findOne({ qrCode }, (err, user) => {
      if (err) {
          res.status(500).send({ message: 'Error authenticating user' });
      } else if (!user) {
          res.status(401).send({ message: 'Invalid QR code' });
      } else {
          res.send({ message: 'User authenticated successfully', user });
      }
  });
});



// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Ohanz Server started on port ${port}`);
});