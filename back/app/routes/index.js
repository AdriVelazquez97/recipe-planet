const router = require('express').Router();

const { checkToken } = require('../middlewares/index')

const userRouter = require('./userRouter');
const recipeRouter = require('./recipeRouter');
const authRouter = require('./authController');

router.use('/auth', authRouter);
router.use('/users', checkToken, userRouter);
router.use('/recipe', checkToken, recipeRouter);

module.exports = router;