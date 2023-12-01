const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  schedule: String,
  content: String,
  timestamp: Date,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  sneaker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sneaker',
  },
});
 
module.exports = mongoose.model('Notification', notificationSchema);