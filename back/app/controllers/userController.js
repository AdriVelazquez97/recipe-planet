const User = require('../models/userModel')

const getAllUsers = (req, res) => {
  User.find()
    .then(response => res.json(response))
    .catch(err => handdleError(err, res)) 
}

const getUserById = (req, res) => {
  res.json('Route 2')
}

const createUser = (req, res) => {
  const newUser = req.body
  
  User.create(newUser)
    .then(responde => {
      res.json({
        msg: 'Created',
        user: responde,
      })
    })
    .catch(err => handdleError(err, res))
}

const updateUser = (req, res) => {
  res.json('Route 4')  
}

const deleteUser = (req, res) => {
  res.json('Route 5')  
}

function handdleError(err, res) {
  return res.status(400).json(err);
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
}