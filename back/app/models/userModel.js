const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  // TODO Mongoose validationis a shit :)
  name: {
    type: String,
    required: [true, 'Name is a required value'],
    // TODO
  },  
  email: {
    type: String,
    required: [true, 'Email is a required value'],
    unique: true
    // TODO
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