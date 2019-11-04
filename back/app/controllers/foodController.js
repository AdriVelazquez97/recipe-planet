const Food = require('../models/foodModel')

const getAllFoods = (req, res) => {
  Food.find()
    .then(response => res.json(response))
    .catch(err => handdleError(err, res))
}

function handdleError(err, res) {
  return res.status(400).json(err);
}

module.exports = {
  getAllFoods,
}