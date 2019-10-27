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
  isValidate: {
    type: Boolean,
    default: false
  },
  img: {
    type: String,
    default: ''
  },
  creation_date: {
    // Should be Date
    type: String,
    default: '1234567890'
  },
  recipes: {
    type: Array,
    default: []
  },
  followers: {
    type: Array,
    default: []
  },
})


module.exports = mongoose.model('User', userSchema)