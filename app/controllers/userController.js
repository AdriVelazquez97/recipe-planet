const User = require('../models/userModel')

const getAllUsers = (req, res) => {
  res.json('Route 1')  
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
    .catch(err => { 
      res.json(err).status(400)
    })
}

const updateUser = (req, res) => {
  res.json('Route 4')  
}

const deleteUser = (req, res) => {
  res.json('Route 5')  
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
}