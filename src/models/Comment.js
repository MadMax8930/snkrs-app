const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  message: String,
  parentMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  sneaker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sneaker',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model('Comment', commentSchema);
