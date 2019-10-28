const router = require('express').Router();

const userRouter = require('./userRouter');
const recipeRouter = require('./recipeRouter');
const authRouter = require('./authController');

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/recipe', recipeRouter);

module.exports = router;