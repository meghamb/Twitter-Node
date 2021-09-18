const express = require('express');
const { json, urlencoded } = require('body-parser');
const cors = require('cors');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const passport = require('passport');
// using mongostore because on refresh the cookie exists, but signin info not haved, asks/looks for new cookie
const mongoStore = require('connect-mongo');
const sassMiddleware=require('node-sass-middleware');
const flash = require('connect-flash');

const passportLocal = require('./src/config/passport-local-strategy');

const router = require('./src/routes/index');
const connect = require('./src/config/database');
const {setFlash}=require('./src/config/middleware');

const app = express(); 

app.use(sassMiddleware({
    src:'./src/assets/scss',
    dest:'./src/assets/css',
    debug:true,
    outputStyle:'expanded',
    prefix: '/css'
}));
app.use(cors());
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
app.use(session({
    name: 'twitter',
    secret: 'meghamegha',
    resave: false,
    cookie: {
        maxAge: 6000000
    },
    store: new mongoStore({
        mongoUrl: 'mongodb://localhost/twitter_dev',
        autoRemove: 'disable'
    }, function (err) {
        if (err)
            console.error(err);
        console.log('connect-mongo setup done');
    })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
/* https://www.npmjs.com/package/connect-flash */
app.use(flash());
app.use(setFlash);

app.use('/', router);

app.listen(3000, async () => {
    await connect();
    console.log('Server started at port 3000');
});