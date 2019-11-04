const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  description: {
    type: String,
  },
  ingredients: [{
    type: Object,
    cuantity: String,
    food: String
  }],
  steps: {
    type: Array,
  },
  img: {
    type: String,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  creation_date: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model('Recipe', recipeSchema)