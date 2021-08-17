const express = require('express');
const router = require('./src/routes/index');
const expressLayouts = require('express-ejs-layouts');
const app = express();

app.use(expressLayouts);
app.set('layout', './layouts/layout');

app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use('/', router);

app.listen(3000, () => {
    console.log('Server started at port 3000');
})