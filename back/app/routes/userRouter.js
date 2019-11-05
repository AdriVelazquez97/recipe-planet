const router = require('express').Router();
const multer = require('multer')
const upload = multer()

const {
  getAllUsers,
  getUserById,
  updateUser,
  getUserRecipesById,
  updateUserRecipes,
  deleteUserRecipe,
  searchWithFilters,
  updateUserFollowing,
  getUserImg,
  updateUserImg
} = require('../controllers/userController')


router.get('/', getAllUsers);
router.get('/:id/recipes', getUserRecipesById)
router.get('/:id', getUserById);
router.get('/:id/image', getUserImg);

router.put('/:id', updateUser);
router.put('/:id/recipes', updateUserRecipes);
router.put('/:id/following', updateUserFollowing);
router.put('/:id/image', updateUserImg)

router.post('/searchWithFilters', searchWithFilters)

router.delete('/:id/recipes/:recipeId', deleteUserRecipe);


module.exports = router;