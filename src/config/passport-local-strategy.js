const passport = require('passport');

//strategy is how authentication happens
const localStrategy = require('passport-local').Strategy;

// to call user.findone
const User = require('../models/user');

// callback needs email password, and done to go next
// next find user
passport.use(new localStrategy({
    usernameField: 'email'
}, (email, password, done) => {
    User.findOne({ email: email }, function (err, user) {
        if (err) {
            console.log(err);
            return done(err);
        }
        if (!user || user.password != password) {
            console.log('Invalid password');
            // if no user return err=null and user=false
            return done(null, false);
        }
        // if user, return err=null, user=user
        return done(null, user);
    })
}));

// http://www.passportjs.org/docs/authenticate/ read sessions subheader
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        if (err) {
            console.log(err);
            return done(err);
        }
        done(null, user);
    });
});

module.exports = passport;