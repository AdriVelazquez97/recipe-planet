const router = require('express').Router();

const {
  getAllUsers,
  getUserById,
  updateUser
} = require('../controllers/userController')


router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
//router.get('/:id/recipes, ())


module.exports = router;