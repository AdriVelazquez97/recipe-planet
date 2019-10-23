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
//router.get('/:id/recipes, ())
router.post('/', createUser);
router.put('/:id', updateUser);


module.exports = router;