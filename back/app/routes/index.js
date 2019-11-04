const router = require('express').Router();

const { checkToken } = require('../middlewares/index')

const userRouter = require('./userRouter');
const recipeRouter = require('./recipeRouter');
const authRouter = require('./authRouter');
const foodRouter = require('./foodRouter');

router.use('/auth', authRouter);
router.use('/users', checkToken, userRouter);
router.use('/recipes', checkToken, recipeRouter);
router.use('/foods', checkToken, foodRouter);


module.exports = router;