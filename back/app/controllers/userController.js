const User = require('../models/userModel')

const getAllUsers = (req, res) => {
  User.find().lean().exec()
    .then(users => res.json(users))
    .catch(err => handdleError(err, res)) 
}

const getUserById = (req, res) => {
  const userId = req.params.id
  User.findById(userId)
  .then(user => res.json(user))
  .catch(err => handdleError(err, res)) 
}

const updateUser = (req, res) => {
  const userId = req.params.id
  const userUpdated = req.body

  User.findOneAndUpdate({_id: userId},
    userUpdated,
    {new: true})
  .then(user => res.json(user))
  .catch(err => handdleError(err, res)) 
}

function handdleError(err, res) {
  return res.status(400).json(err);
}

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
}