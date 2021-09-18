const User = require('../models/user');

const profile = function (req, res) {
    User.findById(req.params.id, function(err,user){
        if (err) {
            console.log(err);
            return res.redirect('/');
        }
        if(!user){
            console.log('user not found')
            return res.redirect('/');
        }
        return res.render('users/userProfile', {
            title:'User Profile',
            profile_user: user
        });
    })
}

const update = function (req, res) {
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.user.id, req.body, function(err,user){
            if (err) {
                console.log('err updating user name');
                return res.redirect('/');
            }
            return res.redirect('back');
        })
    }else
        return res.status(401).isAuthenticated('Unauthorised');
}

const signUp = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render('users/userSignUp', {
        title: 'Twitter | Sign Up'
    });
}

const signIn = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render('users/userSignIn', {
        title: 'Twitter | Sign In'
    });
}

const create = function (req, res) {
    // console.log(req.body);
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
const createSession = function (req, res) {
    req.flash('success', 'Signed in successfully');
    return res.redirect('/');
}

const destroySession = function (req, res) {
    req.flash('info', 'Signed out successfully');
    req.logout();
    return res.redirect('/');
}

module.exports = {
    profile, signIn, signUp, createSession, create, destroySession,
    update
}