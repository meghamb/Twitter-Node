const express = require('express');
const { profile, signIn, signUp, create, createSession, destroySession } = require('../controllers/userController');
const router = express.Router();
const passport = require('passport');

router.get('/profile', passport.checkAuthentication, profile);
router.get('/signin', signIn);
router.get('/signup', signUp);
router.post('/create', create);
router.post('/create-session', passport.authenticate(
    'local',
    {
        successRedirect: '/',
        failureRedirect: '/signin'
    }
), createSession);
router.get('/signout', destroySession);

module.exports = router;