const chai = require('chai');
const chaiHttp  = require('chai-http');
const jwt = require('jsonwebtoken');
const expect = chai.expect;
const app = require('../app');
const Item = require('../models/Item');
const User = require('../models/Item');

chai.use(chaiHttp);
var token; 
var itemId;
var cartId;

describe('Cart item test', function() {
    before(function(done) {
      chai
        .request(app)
        .post('/users/signup')
        .send({'name': 'sarah', 'email': 'sarah@gmail.com', 'password': 'sarah123'})
        .end(function(err, res) {
          let item = {
            developer: 'Insomniac',
            name: 'Spider-Man',
            price: 600000,
            description: 'Top SuperHeroes Games',
            image: 'https://i5.walmartimages.ca/images/Large/574/584/6000198574584.jpg',
            stock: 50,
            category: ['marvel', 'superheroes']
          }
          chai
            .request(app)
            .post('/users/signin')
            .send({'email': 'sarah@gmail.com', 'password': 'sarah123'})
            .end(function(err, res) {
               token = res.body.token;
               chai
               .request(app)
               .post('/items')
               .set('token', token)
               .send(item)
               .end(function(err, res) {
                  itemId = res.body._id;
                  done();
               })
            })
        })     
    })
    after(function(done) {
        Item.deleteMany({})
        .then(() => {
           User.deleteMany({})
        })
        .then(() => {
            done();
        })
        .catch((err) => {
          console.log(err)
          done();
        })
    })
    describe('POST/carts', function() {
      let data = { ItemId: itemId }
      it('should return status code of 200 if user already signed in and itemId is provided', function(done) {
        chai
            .request(app)
            .post('/carts')
            .send(data)
            .set('token', token)
            .end(function(err, res) {
              expect(res).to.have.status(200);
              expect(res.body).to.be.an('object');
              expect(res.body).to.have.property('itemId');
              expect(res.body).to.have.property('userId');
              expect(res.body).to.have.property('_id');
              cartId = res.body._id;
              done();
            })
      })
      it('should return status code of 400 if itemId is an empty string', function(done) {
        chai
          .request(app)
          .post('/carts')
          .send({itemId: ''})
          .set('token', token)
          .end(function(err, res) {
            expect(res).to.have.status(400);
            expect(res.body).to.have.property('err');
            done();
          })
      })
      it('should return status code of 400 if key token is not provided', function(done) {
            chai
              .request(app)
              .post('/carts')
              .send(data)
              .end(function(err, res) {
                expect(res).to.have.status(400);
                expect(res.body).to.be.an('object');
                expect(res.body.err.name).to.equal('JsonWebTokenError');
                expect(res.body.err.message).to.equal('jwt must be provided');
                expect(res.body.message).to.equal('invalid token');
                done();
              })
      })
      it('should return status code of 400 if token is invalid', function(done) {
            chai
              .request(app)
              .post('/carts')
              .send(data)
              .set('token', 'invalid token')
              .end(function(err, res) {
                expect(res).to.have.status(400);
                expect(res.body).to.be.an('object');
                expect(res.body.err.name).to.equal('JsonWebTokenError');
                expect(res.body.message).to.equal('invalid token');
                done();
              })
      })
    })
    describe('GET/carts', function() {
      it('should return status code of 200', function(done) {
            chai
              .request(app)
              .get('/carts')
              .set('token', token)
              .end(function(err, res) {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
                done();
              })
      })
      it('should return status code of 400 if key token is not provided', function(done) {
            chai
              .request(app)
              .get('/carts')
              .end(function(err, res) {
                expect(res).to.have.status(400);
                expect(res.body).to.be.an('object');
                expect(res.body.err.name).to.equal('JsonWebTokenError');
                expect(res.body.err.message).to.equal('jwt must be provided');
                expect(res.body.message).to.equal('invalid token');
                done();
              })
      })
      it('should return status code of 400 if token is invalid', function(done) {
        chai
          .request(app)
          .get('/carts')
          .set('token', 'invalid token')
          .end(function(err, res) {
            expect(res).to.have.status(400);
            expect(res.body).to.be.an('object');
            expect(res.body.err.name).to.equal('JsonWebTokenError');
            expect(res.body.message).to.equal('invalid token');
            done();
        })
      })
    })
    describe('PUT/carts/remove_one_item/:item_id', function() {
      it('should return status code of 200 if item_id is provided as req.params', function(done) { 
        chai
          .request(app)
          .put(`/carts/remove_one_item/${itemId}`)
          .set('token', token)
          .end(function(err, res) {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('itemId');
            expect(res.body).to.have.property('_id');
            expect(res.body).to.have.property('userId');
            done();
          })
      })
      it ('should return status code of 404 if itemId params is not provided', function(done) {
        chai
          .request(app)
          .put(`/carts/remove_one_item/`)
          .set('token', token)
          .end(function(err, res) {
            expect(res).to.have.status(404);
            done();
          })
      })
      it('should return status code of 400 if key token is not provided', function(done) {
        chai
          .request(app)
          .put(`/carts/remove_one_item/${itemId}`)
          .end(function(err, res) {
            expect(res).to.have.status(400);
            expect(res.body).to.be.an('object');
            expect(res.body.err.name).to.equal('JsonWebTokenError');
            expect(res.body.err.message).to.equal('jwt must be provided');
            expect(res.body.message).to.equal('invalid token');
            done();
          })
      })
      it('should return status code of 400 if token is invalid', function(done) {
        chai
          .request(app)
          .put(`/carts/remove_one_item/${itemId}`)
          .set('token', 'invalid token')
          .end(function(err, res) {
            expect(res).to.have.status(400);
            expect(res.body).to.be.an('object');
            expect(res.body.err.name).to.equal('JsonWebTokenError');
            expect(res.body.message).to.equal('invalid token');
            done();
        })
      })
    })
    describe('PUT/carts/remove_certain_item/:item_id', function() {
      it ('should return status code of 200 if item_id is provided as req.params', function(done) {
        chai
          .request(app)
          .put(`/carts/remove_certain_item/${itemId}`)
          .set('token', token)
          .end(function(err, res) {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('itemId');
            expect(res.body).to.have.property('_id');
            expect(res.body).to.have.property('userId');
            done();
          })
      })
      it ('should return status code 400 if item_id is invalid', function(done) {
        chai
          .request(app)
          .put(`/carts/remove_certain_item/invalid`)
          .set('token', token)
          .end(function(err, res) {
            expect(res).to.have.status(400);
            expect(res.body).to.have.property('err');
            done();
          })
      })
      it ('should return status code of 404 if item_id params is not provided', function(done) {
        chai
          .request(app)
          .put(`/carts/remove_certain_item/`)
          .set('token', token)
          .end(function(err, res) {
            expect(res).to.have.status(404);
            done();
          })
      })
      it('should return status code of 400 if key token is not provided', function(done) {
        chai
          .request(app)
          .put(`/carts/remove_certain_item/${itemId}`)
          .end(function(err, res) {
            expect(res).to.have.status(400);
            expect(res.body).to.be.an('object');
            expect(res.body.err.name).to.equal('JsonWebTokenError');
            expect(res.body.err.message).to.equal('jwt must be provided');
            expect(res.body.message).to.equal('invalid token');
            done();
          })
      })
      it('should return status code of 400 if token is invalid', function(done) {
        chai
          .request(app)
          .put(`/carts/remove_certain_item/${itemId}`)
          .set('token', 'invalid token')
          .end(function(err, res) {
            expect(res).to.have.status(400);
            expect(res.body).to.be.an('object');
            expect(res.body.err.name).to.equal('JsonWebTokenError');
            expect(res.body.message).to.equal('invalid token');
            done();
        })
      })
    })
    describe('DELETE/carts/:cart_id', function() {
      it('should return status code of 400 if key token is not provided', function(done) {
        chai
          .request(app)
          .delete(`/carts/${cartId}`)
          .end(function(err, res) {
            expect(res).to.have.status(400);
            expect(res.body).to.be.an('object');
            expect(res.body.err.name).to.equal('JsonWebTokenError');
            expect(res.body.err.message).to.equal('jwt must be provided');
            expect(res.body.message).to.equal('invalid token');
            done();
          })
      })
      it('should return status code of 400 if token is invalid', function(done) {
        chai
          .request(app)
          .delete(`/carts/${cartId}`)
          .set('token', 'invalid token')
          .end(function(err, res) {
            expect(res).to.have.status(400);
            expect(res.body).to.be.an('object');
            expect(res.body.err.name).to.equal('JsonWebTokenError');
            expect(res.body.message).to.equal('invalid token');
            done();
        })
      })
      it ('should return status code 400 if cart_id is invalid', function(done) {
        chai
          .request(app)
          .delete(`/carts/invalid`)
          .set('token', token)
          .end(function(err, res) {
            expect(res).to.have.status(400);
            expect(res.body).to.have.property('err');
            done();
          })
      })
      it ('should return status code of 404 if cart_id params is not provided', function(done) {
        chai
          .request(app)
          .put(`/carts/`)
          .set('token', token)
          .end(function(err, res) {
            expect(res).to.have.status(404);
            done();
          })
      })
      it('should return status code of 200', function(done) {
        chai
          .request(app)
          .delete(`/carts/${cartId}`)
          .set('token', token)
          .end(function(err, res) {
              expect(res).to.have.status(200);
              expect(res.body).to.have.property('message');
              expect(res.body.message).to.equal('success delete cart');
              expect(res.body).to.have.property('delete_id');
              done();
          })
      })
    })
})
