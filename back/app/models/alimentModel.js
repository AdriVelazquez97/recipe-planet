const mongoose = require('mongoose');

const alimentModel = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  }
});


module.exports = mongoose.model('Aliment', alimentModel)