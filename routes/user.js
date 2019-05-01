const userRouter = require('express').Router();

const loginationUser = require('../controllers/user/loginationUser');

userRouter.post('/login', loginationUser);

module.exports = userRouter;
