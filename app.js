var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var logger = require('morgan');
var cors = require('cors');
var app = express();
var cookie = require('cookie');
var bodyParser = require('body-parser')

// app.use(bodyParser.urlencoded({
//   extended: true
// }));
// app.use(express.urlencoded());
// app.use(express.urlencoded({ extended: false }));

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
process.on('uncaughtException', function (err) {
  console.log(err);
});

app.use('/api', async function (req, res, next) {
  console.log('Cookies: api ', req.cookies.user)
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  // res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  res.header("Access-Control-Allow-Headers", "*");
  console.log('Cookies: api ', req.cookies.user)
  next();
});

var api = require('./routes/api');
app.use('/api/v1.0/', api);

module.exports = app;
