const express = require('express');
const router = express.Router();

const homeController = require('../controllers/homeController');
const userRouter = require('./users');

console.log('router up!');
router.get('/', homeController.root);
router.use('/users', userRouter);

module.exports = router;