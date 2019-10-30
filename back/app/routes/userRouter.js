const router = require('express').Router();

const {
  getAllUsers,
  getUserById,
  updateUser,
  getUserRecipesById,
  updateUserRecipes,
  deleteUserRecipe,
  searchWithFilters,
  updateUserFollowing
} = require('../controllers/userController')


router.get('/', getAllUsers);
router.get('/:id/recipes', getUserRecipesById)
router.get('/:id', getUserById);

router.put('/:id', updateUser);
router.put('/:id/recipes', updateUserRecipes);
router.put('/:id/following', updateUserFollowing);

router.post('/searchWithFilters', searchWithFilters)

router.delete('/:id/recipes/:recipeId', deleteUserRecipe);


module.exports = router;