const UserModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


function signup(req, res) {
  const hashedPWD = bcrypt.hashSync(req.body.userPassword, 10);
  UserModel.create({
    name: req.body.userName,
    email: req.body.userEmail,
    password: hashedPWD
  })
  .then(user => {
    const userData = { userName: user.name, email: user.email};

    const token = jwt.sign(
      userData,
      "secret", // TODO SECRET MORE SECRET PLEASE
      { expiresIn: "1h" }
    );

    return res.json({ token: token, ...userData })
  })
  .catch((err) => res.status(403).json({error: err.errmsg}))
}


module.exports = signup
