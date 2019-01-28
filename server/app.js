const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const NODE_ENV = process.env.NODE_ENV || 'development';

const itemsRouter = require('./routes/items');
const usersRouter = require('./routes/users');
const cartRouter = require('./routes/carts');
const youtubeRouter = require('./routes/youtube');
const transactionsRouters = require('./routes/transactions');

const app = express();
app.use(cors());
mongoose.connect('mongodb://localhost/e-commerce2' + NODE_ENV);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/items', itemsRouter);
app.use('/users', usersRouter);
app.use('/carts', cartRouter);
app.use('/transactions', transactionsRouters);
app.use('/youtube', youtubeRouter);


module.exports = app;
