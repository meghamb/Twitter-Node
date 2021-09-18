const express = require('express');
const { create, destroy } = require('../controllers/tweetController');
const router = express.Router();
const passport = require('passport');
router.post('/create', passport.checkAuthentication,create);
router.get('/destroy/:id', passport.checkAuthentication,destroy);

module.exports = router;