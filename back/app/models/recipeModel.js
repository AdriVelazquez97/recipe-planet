const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  description: {
    type: String,
  },
  ingredents: [{
    type: Object,
    food: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Food'
    }],
    text: String,
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
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  creation_date: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model('Recipe', recipeSchema)