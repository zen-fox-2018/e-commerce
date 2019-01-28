require("dotenv").config();
const express = require ('express');
const app = express();
const port = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

const cors = require('cors');
const bodyParser = require ('body-parser');
const cartRouter = require ('./routes/cart');
const itemRouter = require ('./routes/item');
const userRouter = require ('./routes/user');

// DB CONNECT 
const mongoose = require ('mongoose');
let uri ; 
NODE_ENV == 'development' ? uri = 'mongodb://localhost:27017/zappos-clone' : uri = process.env.MONGO_URI;
mongoose.connect(uri, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', () =>console.log('db connection error'));
db.once('open', function () {console.log('connection')});

//parse application/json and look for raw text                                        
app.use(bodyParser.json());                                     
app.use(bodyParser.urlencoded({extended: true}));               
app.use(bodyParser.text());                                    
app.use(bodyParser.json({ type: 'application/json'}));  


app.use(cors());

app.use('/cart', cartRouter);
app.use('/items', itemRouter);
app.use('/users',userRouter);
app.listen(port, ()=> console.log('cors-enabled router is listening'))