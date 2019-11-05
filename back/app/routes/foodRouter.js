const router = require('express').Router();

const {
  getAllFoods,
} = require('../controllers/foodController')


router.get('/', getAllFoods);

module.exports = router;