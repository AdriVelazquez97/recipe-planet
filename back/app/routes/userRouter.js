const router = require('express').Router();

const {
  getAllUsers,
  getUserById,
  updateUser,
  getUserRecipesById,
  updateUserRecipes,
  deleteUserRecipe
} = require('../controllers/userController')


router.get('/', getAllUsers);
router.get('/:id/recipes', getUserRecipesById)
router.get('/:id', getUserById);

router.put('/:id', updateUser);
router.put('/:id/recipes', updateUserRecipes);

router.delete('/:id/recipes/:recipeId', deleteUserRecipe);
//router.get('/:id/recipes, ())


module.exports = router;