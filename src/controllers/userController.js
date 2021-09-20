const User = require('../models/user');
// file upload
const multer = require('multer');
const upload = multer({ dest: './src/uploads/' });
const { uploadFile, getFile } = require('../config/s3');
/* https://nodejs.org/api/fs.html#fs_fspromises_unlink_path */
const { unlink } = require('fs/promises');

const profile = async function (req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      console.log('user not found');
      return res.redirect('/');
    }
    if (!user.avatar) {
      user.avatar = '8fcc930134921ec614ba7603144787e9';
    }
    return res.render('users/userProfile', {
      title: 'User Profile',
      profile_user: user,
    });
  } catch (err) {
    console.log(err);
    return res.redirect('/');
  }
};
const getAvatar = function (req, res) {
  const imgStream = getFile(req.params.key);
  imgStream.pipe(res);
};

const update = function (req, res) {
  if (req.user.id == req.params.id) {
    User.findByIdAndUpdate(req.user.id, req.body, function (err, user) {
      if (err) {
        console.log('err updating user name');
        return res.redirect('/');
      }
      return res.redirect('back');
    });
  } else return res.status(401).isAuthenticated('Unauthorised');
};

const updateAvatar = async function (req, res) {
  const file = req.file;
  try {
    const result = await uploadFile(file);
    /* delete the file from uploads folder */
    await unlink(file.path);
    const currentUser = req.user.id;
    User.findByIdAndUpdate(
      currentUser,
      { avatar: result.key },
      function (err, user) {
        if (err) {
          console.log('err updating user avatar ', err);
          return res.redirect('/');
        }
        return res.redirect('back');
      }
    );
    // console.log(file);
    // console.log(result );
    // return res.redirect('/');
  } catch (err) {
    console.log(err);
    return res.redirect('/');
  }
};

const signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect('/users/profile');
  }
  return res.render('users/userSignUp', {
    title: 'Twitter | Sign Up',
  });
};

const signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect('/users/profile');
  }
  return res.render('users/userSignIn', {
    title: 'Twitter | Sign In',
  });
};

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
};
const createSession = function (req, res) {
  req.flash('success', 'Signed in successfully');
  return res.redirect('/');
};

const destroySession = function (req, res) {
  req.flash('info', 'Signed out successfully');
  req.logout();
  return res.redirect('/');
};

module.exports = {
  profile,
  signIn,
  signUp,
  createSession,
  create,
  destroySession,
  update,
  updateAvatar,
  getAvatar,
};
