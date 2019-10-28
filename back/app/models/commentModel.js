const mongoose = require('mongoose');

const commentModel = new mongoose.Schema({
  recipeId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe',
  }],
  text: {
    type: String,
    unique: true
  }
});


module.exports = mongoose.model('Comment', commentModel)