const express = require('express');
const router = express.Router();

const homeController = require('../controllers/homeController');
const userRouter = require('./users');
const tweetRouter = require('./tweet');
const commentRouter = require('./comment');

console.log('router up!');
router.get('/', homeController.root);
router.use('/users', userRouter);
router.use('/tweets', tweetRouter);
router.use('/comments', commentRouter);

module.exports = router;
