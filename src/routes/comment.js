const express = require('express');
const { create } = require('../controllers/commentController');
const router = express.Router();
const passport = require('passport');
router.post('/create', passport.checkAuthentication,create);

module.exports = router;