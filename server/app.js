var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var indexRouter = require('./routes/index');

var app = express();
const NODE_ENV = process.env.NODE_ENV || 'development';

if (NODE_ENV == 'test') {
  const mongoose = require('mongoose');
  mongoose.connect(`mongodb://localhost:27017/e-commerce-${NODE_ENV}`, {useNewUrlParser: true});
}
// app.use(logger('dev'));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

module.exports = app;
