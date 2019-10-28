const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is a required value']
  },  
  email: {
    type: String,
    unique: true,
    //TODO
  },
  password: {
    type: String,
    required: [true, 'Password is a required value']
  },
  img: {
    type: String
  },
  recipes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe',
  }],
  savedRecipes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe',
  }],
  following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  creation_date: {
    type: Date,
    default: new Date()
  },
})


module.exports = mongoose.model('User', userSchema)