const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  userId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  text: {
    type: String,
    unique: true
  },
  creation_date: {
    type: Date,
    default: new Date(),
  },
});


module.exports = commentSchema