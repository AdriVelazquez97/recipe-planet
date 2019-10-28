const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  aliments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Aliment'
  }],
  steps: {
    type: String,
  },
  img: {
    type: String,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  saved: Boolean,
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  creation_date: {
    type: Date,
  },
});

module.exports = mongoose.model('Recipe', recipeSchema)