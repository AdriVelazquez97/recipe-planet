const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  ingredients: {
    type: String,
  },
  steps: {
    type: String,
  },
  img: {
    type: String,
  },
  labels: {
    type: Array,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  saved: Boolean,
  comments: String,
  creation_date: {
    type: String,
  },
});

module.exports = mongoose.model('Recipe', recipeSchema)