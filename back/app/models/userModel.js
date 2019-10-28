const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    // is not working good
    type: String,
    required: [true, 'Name is a required value']
  },  
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is a required value']
  },
  img: {
    type: String,
    default: ''
  },
  recipes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe',
  }],
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  creation_date: {
    type: Date,
  },
})


module.exports = mongoose.model('User', userSchema)