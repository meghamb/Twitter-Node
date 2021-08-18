const User = require('../models/user');
const profile = function (req, res) {
    return res.render('users/userProfile');
}

const signUp = function (req, res) {
    return res.render('users/userSignUp', {
        title: 'Twitter | Sign Up'
    });
}

const signIn = function (req, res) {
    return res.render('users/userSignIn', {
        title: 'Twitter | Sign In'
    });
}

const create = function (req, res) {
    console.log(req.body);
    if (req.body.password != req.body.confirmPassword) {
        return res.redirect('back');
    }
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
            console.log(err);
            return;
        }
        if (!user) {
            User.create(req.body, function (err, user) {
                if (err) {
                    console.log(err);
                    return;
                }
                return res.redirect('/users/signin');
            });
        } else {
            return res.redirect('/users/signin');
        }
    });
}
const creatSession = function (req, res) {
    res.status(200).end();
}

module.exports = {
    profile, signIn, signUp, creatSession, create
}