var createError = require('http-errors');
var express = require('express');
const cors = require('cors')
require('dotenv').config()
const mongoose = require('mongoose')

const status = process.env.NODE_ENV
// mongoose.connect(`mongodb://localhost:27017/ZenFox-Ecommerce-${status}`)

//---------------------------------CONNECT MLAB DATABASE---------------------------------------
const mongodbUri = 'mongodb://anharaf:anhar1234@ds259865.mlab.com:59865/zenfox-ecommerce'
const port = process.env.PORT || 3000

//connect mongoose
mongoose.connect(mongodbUri,
  {
    useNewUrlParser: true,
    auth: {
      user: 'anharaf',
      password: 'anhar1234'
    }
  });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log(('You are Mongected'));
});
//------------------------------------------------------------------------------


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const cartRouter = require('./routes/carts');
const transactionRouter = require('./routes/transaction');
const categoryRouter = require('./routes/categories')


var app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/cart', cartRouter);
app.use('/transactions', transactionRouter);
app.use('/categories', categoryRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;
