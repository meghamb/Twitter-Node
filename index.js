const express = require('express');
const router = require('./src/routes/index');
const connect = require('./src/config/database');
const expressLayouts = require('express-ejs-layouts');
const app = express();

// setting path for static contents
app.use(express.static('./src/assets'));

// to extract css and scripts
app.set('layout extractStyles', true);
//to place all scripts at the end
app.set('layout extractScripts', true);

// setting to use express layout (3rd party docs)
app.use(expressLayouts);
app.set('layout', './layouts/layout');

app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use('/', router);
app.listen(3000, async () => {
    await connect();
    console.log('Server started at port 3000');
})