const mongoose = require('mongoose');

const qrCodeSchema = new mongoose.Schema({
  code: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const QrCode = mongoose.model('QrCode', qrCodeSchema);

module.exports = QrCode;