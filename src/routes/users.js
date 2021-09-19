const express = require('express');
const { profile, signIn, signUp, create, createSession, destroySession, update,updateAvatar, getAvatar } = require('../controllers/userController');
const router = express.Router();
const passport = require('passport');
// file upload
const multer  = require('multer');
const upload = multer({ dest: './src/uploads/' });

router.get('/profile/:id', passport.checkAuthentication, profile);
router.post('/update/:id', passport.checkAuthentication, update);
router.get('/signin', signIn);
router.get('/signup', signUp);
router.post('/create', create);
router.post('/updateAvatar', passport.checkAuthentication,upload.single('avatar'), updateAvatar);
router.get('/images/:key', getAvatar );
router.post('/create-session', passport.authenticate(
    'local',
    {
        failureRedirect: '/signin'
    }
), createSession);
router.get('/signout', destroySession);

module.exports = router;