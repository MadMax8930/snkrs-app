const mongoose = require('mongoose');

const sneakerSchema = new mongoose.Schema({
  img: String,
  name: String,
  model: String,
  retailPrice: Number,
  resellPrice: String,
  resellIndex: String,
  dateRelease: String,
  brand: String,
  copping: Boolean,
  coppers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
});

module.exports = mongoose.model('Sneaker', sneakerSchema);