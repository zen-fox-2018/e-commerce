var createError = require('http-errors');
var express = require('express');
var app = express()
var logger = require('morgan');
var cors = require('cors')
require('dotenv').config()
const port     = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ecommerce_tdd_demo_' + NODE_ENV, { useNewUrlParser: true });
// mongoose.connect('mongodb://localhost/ecommerce-phase2', { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connect to database")
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var cartsRouter = require('./routes/carts');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/carts', cartsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;