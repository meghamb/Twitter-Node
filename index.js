const express = require('express');
const { json, urlencoded } = require('body-parser');
const cors = require('cors');
const expressLayouts = require('express-ejs-layouts');

const router = require('./src/routes/index');
const connect = require('./src/config/database');

const app = express();

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
app.use('/', router);
app.listen(3000, async () => {
    await connect();
    console.log('Server started at port 3000');
})