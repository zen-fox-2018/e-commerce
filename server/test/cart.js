const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;
const User = require('../models/user');
const Product = require('../models/product');
const Cart = require('../models/cart');

chai.use(chaiHttp);

const app = require('../app');
const { request } = chai;

var tokens;
var userId;
var productId;

before( async () => {
  try {
    let { _id } = await User.create({
      email: 'cart@mail.com',
      password: '12345',
      role: 'customer'
    });
    userId = _id;

    let { body } = await request(app).post('/users/login').send({
      email: 'cart@mail.com',
      password: '12345'
    });
    tokens = body.token;

    let data = await request(app).post('/products').send({
      title: 'kisi kisi un',
      author: 'guru guru',
      publisher: 'gramedia',
      price: 50000,
      stock: 10,
      tag: 'School',
      image: 'www.com'
    });
    productId = data.body._id;
  } catch (err) {
    console.log(err);
  };
});

after( async () => {
  try {
    await User.deleteMany({});
    await Product.deleteMany({});
    await Cart.deleteMany({});
  } catch (err) {
    console.log(err);
  };
});

describe('/cart END POINT TESTING', () => {

  describe('/cart POST CREATE', () => {

    it ('should return object success create with status 201', (done) => {
      let newCart = {
        user: userId,
        items: {
          product: productId,
          total: 1
        }
      };
      request(app)
        .post('/cart')
        .set('token', tokens)
        .send(newCart)
        .end( (err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('user');
          expect(res.body).to.have.property('items');
          done();
        });
    });
    it ('should return object error invalid token with status 500', (done) => {
      let newCart = {
        user: userId,
        items: {
          product: productId,
          total: 1
        }
      };
      request(app)
        .post('/cart')
        .set('token', 'initokenboongan')
        .send(newCart)
        .end( (err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(500);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('errors');
          done();
        });
    });
    it ('should return object invalid path endpoint with status 404', (done) => {
      let newCart = {
        user: userId,
        items: {
          product: productId,
          total: 1
        }
      };
      request(app)
        .post('/c4rt')
        .set('token', tokens)
        .send(newCart)
        .end( (err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(404);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('not found');
          done();
        });
    });

  });

  describe('/cart GET READ CART', () => {
    
    it ('should return object with status 200', (done) => {
      request(app)
        .get('/cart')
        .set('token', tokens)
        .end( (err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          done();
        })
    });
    it ('should return object invalid path endpoint with status 404', (done) => {
      request(app)
        .get('/c4rt')
        .set('token', tokens)
        .end( (err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(404);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('not found');
          done();
        });
    });
    it ('should return object invalid token with status 500', (done) => {
      request(app)
        .get('/cart')
        .set('token', 'initokenboongan')
        .end( (err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(500);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('errors');
          done();
        });
    });

  });

});

