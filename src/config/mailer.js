const nodemailer = require('nodemailer');

/* to send html content in email added ejs import */
const ejs = require('ejs');
const path = require('path');
require('dotenv').config();

/* https://nodemailer.com/about/ */
// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  servide: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL, // generated ethereal user
    pass: process.env.PASSWORD, // generated ethereal password
  },
});

// send mail with defined transport object
let mailTemplate = function (data, path) {
  var mailerTemplate;
  console.log(process.env.EMAIL, process.env.PASSWORD);
  ejs.renderFile(
    path.join(__dirname + '../views/mailers', path),
    data,
    function (err, template) {
      if (err) {
        console.error(err);
        return;
      }
      mailerTemplate = template;
    }
  );
  return mailerTemplate;
};

module.exports = { transporter, mailTemplate };
