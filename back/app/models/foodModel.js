const mongoose = require('mongoose');

const foodModel = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  }
});

module.exports = mongoose.model('Food', foodModel)