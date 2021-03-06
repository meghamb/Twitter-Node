const express = require('express');
const { json, urlencoded } = require('body-parser');
const cors = require('cors');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const passport = require('passport');
// using mongostore because on refresh the cookie exists, but signin info not haved, asks/looks for new cookie
const mongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
// file upload
const multer = require('multer');
const upload = multer({ dest: './src/uploads/' });
const passportLocal = require('./src/config/passport-local-strategy');

const router = require('./src/routes/index');
const connect = require('./src/config/database');
const { setFlash } = require('./src/config/middleware');

const app = express();
app.use(cors());

/* SOCKET config */
const chatEngine = require('http').Server(app);
const { socket } = require('./src/config/sockets');
const chatSocket = socket(chatEngine);
chatEngine.listen(3001);
console.log('chat engine listening to 3001');

app.use(
  sassMiddleware({
    src: './src/assets/scss',
    dest: './src/assets/css',
    debug: true,
    outputStyle: 'expanded',
    prefix: '/css',
  })
);
app.use(json());
app.use(urlencoded({ extended: true }));
// setting path for static contents
app.use(express.static(__dirname + '/src/assets'));

// to extract css and scripts
app.set('layout extractStyles', true);
//to place all scripts at the end
app.set('layout extractScripts', true);

// setting to use express layout (3rd party docs)
app.use(expressLayouts);
app.set('layout', __dirname + '/src/views/layouts/layout');

app.set('view engine', 'ejs');
app.set('views', './src/views');
// This is the secret used to sign the session cookie.
// Settings object for the session ID cookie.
app.use(
  session({
    name: 'twitter',
    secret: 'meghamegha',
    resave: false,
    cookie: {
      maxAge: 6000000,
    },
    store: new mongoStore(
      {
        mongoUrl: 'mongodb://localhost/twitter_dev',
        autoRemove: 'disable',
      },
      function (err) {
        if (err) console.error(err);
        console.log('connect-mongo setup done');
      }
    ),
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
/* https://www.npmjs.com/package/connect-flash */
app.use(flash());
app.use(setFlash);
// app.post('/profile', upload.single('avatar'), function (req, res, next) {
//     // req.file is the `avatar` file
//     // req.body will hold the text fields, if there were any
//     console.log("Uploaded");
//     return res.redirect('/');
//   })
app.use('/', router);

app.listen(3000, async () => {
  await connect();
  console.log('Server started at port 3000');
});
