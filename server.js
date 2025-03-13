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

// Routes
app.get('/', (req, res) => {
  res.send('QORE App Backend Server');
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Ohanz Server started on port ${port}`);
});