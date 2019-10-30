const jwt = require('jsonwebtoken')
const UserModel = require('../models/userModel')

const checkToken = (req, res, next) =>{
  jwt.verify(req.headers.auth_token, 'secret', (err, token) => {
    if (err) { return res.status(403).json({ error: 'Token not valid' }) }
    UserModel.findOne({ email: token.email })
      .then(user => {
        res.locals.user = user
        next()
      })
  });
}

module.exports = {
  checkToken,
}