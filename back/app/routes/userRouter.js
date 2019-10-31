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
router.get('/:id/img', getUserImg);

router.put('/:id', updateUser);
router.put('/:id/recipes', updateUserRecipes);
router.put('/:id/following', updateUserFollowing);
router.put('/:id/img', upload.single('img'), updateUserImg)

router.post('/searchWithFilters', searchWithFilters)

router.delete('/:id/recipes/:recipeId', deleteUserRecipe);


module.exports = router;