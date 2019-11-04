const mongoose = require('mongoose');
const CommentSchema = require('../models/commentModel')

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
  comments: [CommentSchema],
  creation_date: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model('Recipe', recipeSchema)