const Food = require('../models/foodModel')
const ingredients = require('./ingredients.js')
const mongoose = require('mongoose')

let config = require('../../.env')
const environment = process.env.NODE_ENV
config = config[environment]
if (!config) {
  throw new Error(`❌ Invalid ${environment} environment`)
}

// NONGOOSE
mongoose.connect(config.mongoURL + config.mongoDBName)


Food.insertMany(ingredients)
  .then(() => {
    console.log('Ingredients Inserted')
    mongoose.disconnect()
  })
  .catch(err => console.log(err))
