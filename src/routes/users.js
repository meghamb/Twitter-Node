const express = require('express');
const { profile, signIn, signUp, create, createSession, destroySession, update } = require('../controllers/userController');
const router = express.Router();
const passport = require('passport');

router.get('/profile/:id', passport.checkAuthentication, profile);
router.post('/update/:id', passport.checkAuthentication, update);
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