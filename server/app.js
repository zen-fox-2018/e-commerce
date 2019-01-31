var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

var NODE_ENV = process.env.NODE_ENV || 'development'


const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ecommerce_db_' + `${NODE_ENV}`);




var indexRouter = require('./routes/index');

var app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

module.exports = app;
