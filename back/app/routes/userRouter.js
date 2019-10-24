const router = require('express').Router();

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser
  //deleteUser
} = require('../controllers/userController')


router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
//router.detele()


module.exports = router;