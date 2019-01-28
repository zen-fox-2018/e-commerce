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

describe('CRUD Item Test', function() {
    before(function(done) { 
      chai
        .request(app)
        .post('/users/signup')
        .send({'name': 'sarah', 'email': 'sarah@gmail.com', 'password': 'sarah123'})
        .end(function(err, res) {
            chai
              .request(app)
              .post('/users/signin')
              .send({'email': 'sarah@gmail.com', 'password': 'sarah123'})
              .end(function(err, res) {
                 token = res.body.token;
                 done();
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
    describe('GET/items', function() {
      it('should send status code of 200 and array of object', function(done) {
        chai
          .request(app)
          .get('/items')
          .end(function(err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            done();
          })
      })
    })
    describe('POST/items', function() {
        it('should send status code of 200 and object of new item', function(done) {
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
                .post('/items')
                .set('token', token)
                .send(item)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('_id');
                    expect(res.body).to.have.property('developer');
                    expect(res.body).to.have.property('name');
                    expect(res.body).to.have.property('price');
                    expect(res.body).to.have.property('description');
                    expect(res.body).to.have.property('image');
                    expect(res.body).to.have.property('stock');
                    expect(res.body).to.have.property('category');
                    expect(res.body.developer).to.equal(item.developer);
                    expect(res.body.name).to.equal(item.name);
                    expect(res.body.price).to.equal(item.price);
                    expect(res.body.description).to.equal(item.description);
                    expect(res.body.image).to.equal(item.image);
                    itemId = res.body._id;
                    done();
                })
        })
        it('should send status code of 400 if developer key is null', function(done) {
            let item = {
                name: 'Spider-Man',
                price: 600000,
                description: 'Top SuperHeroes Games',
                image: 'https://i5.walmartimages.ca/images/Large/574/584/6000198574584.jpg',
                stock: 50,
                category: ['marvel', 'superheroes']
            }
            chai
              .request(app)
              .post('/items')
              .set('token', token)
              .send(item)
              .end(function(err, res) {
                  expect(res).to.have.status(400);
                  expect(res.body).to.be.an('object');
                  expect(res.body).to.have.property('err');
                  expect(res.body.err).to.equal('Item validation failed: developer: Developer is Required');
                  done();
              })
        })
        it('should send status code of 400 if name key is null', function(done) {
            let item = {
                developer: 'Insomniac',
                price: 600000,
                description: 'Top SuperHeroes Games',
                image: 'https://i5.walmartimages.ca/images/Large/574/584/6000198574584.jpg',
                stock: 50,
                category: ['marvel', 'superheroes']
            }
            chai
              .request(app)
              .post('/items')
              .set('token', token)
              .send(item)
              .end(function(err, res) {
                  expect(res).to.have.status(400);
                  expect(res.body).to.be.an('object');
                  expect(res.body).to.have.property('err');
                  expect(res.body.err).to.equal('Item validation failed: name: Name is Required');
                  done();
              })
        })
        it('should send status code of 400 if price key is null', function(done) {
            let item = {
                developer: 'Insomniac',
                name: 'Spider',
                description: 'Top SuperHeroes Games',
                image: 'https://i5.walmartimages.ca/images/Large/574/584/6000198574584.jpg',
                stock: 50,
                category: ['marvel', 'superheroes']
            }
            chai
              .request(app)
              .post('/items')
              .set('token', token)
              .send(item)
              .end(function(err, res) {
                  expect(res).to.have.status(400);
                  expect(res.body).to.be.an('object');
                  expect(res.body).to.have.property('err');
                  expect(res.body.err).to.equal('Item validation failed: price: Price is Required');
                  done();
              })
        })
        it('should send status code of 200 even if price is string', function(done) {
            let item = {
                developer: 'Insomniac',
                name: 'Spider',
                price: '20000',
                description: 'Top SuperHeroes Games',
                image: 'https://i5.walmartimages.ca/images/Large/574/584/6000198574584.jpg',
                stock: 50,
                category: ['marvel', 'superheroes']
            }
            chai
              .request(app)
              .post('/items')
              .set('token', token)
              .send(item)
              .end(function(err, res) {
                expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('_id');
                    expect(res.body).to.have.property('developer');
                    expect(res.body).to.have.property('name');
                    expect(res.body).to.have.property('price');
                    expect(res.body).to.have.property('description');
                    expect(res.body).to.have.property('image');
                    expect(res.body).to.have.property('stock');
                    expect(res.body).to.have.property('category');
                    expect(res.body.developer).to.equal(item.developer);
                    expect(res.body.name).to.equal(item.name);
                    expect(res.body.price).to.equal(Number(item.price));
                    expect(res.body.description).to.equal(item.description);
                    expect(res.body.image).to.equal(item.image);
                    done();
              })
        })
        it('should send status code of 400 if description key is null', function(done) {
            let item = {
                developer: 'Insomniac',
                name: 'Spider',
                price: '20000',
                image: 'https://i5.walmartimages.ca/images/Large/574/584/6000198574584.jpg',
                stock: 50,
                category: ['marvel', 'superheroes']
            }
            chai
              .request(app)
              .post('/items')
              .set('token', token)
              .send(item)
              .end(function(err, res) {
                expect(res).to.have.status(400);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('err');
                expect(res.body.err).to.equal('Item validation failed: description: Description is Required');
                done();
              })
        })
        it('should send status code of 400 if image key is null', function(done) {
            let item = {
                developer: 'Insomniac',
                name: 'Spider',
                price: '20000',
                description: 'Top SuperHeroes Games',
                stock: 50,
                category: ['marvel', 'superheroes']
            }
            chai
              .request(app)
              .post('/items')
              .set('token', token)
              .send(item)
              .end(function(err, res) {
                expect(res).to.have.status(400);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('err');
                expect(res.body.err).to.equal('Item validation failed: image: Image is Required');
                done();
              })
        })
        it('should send status code of 400 if stock key is null', function(done) {
            let item = {
                developer: 'Insomniac',
                name: 'Spider-Man',
                price: 600000,
                description: 'Top SuperHeroes Games',
                image: 'https://i5.walmartimages.ca/images/Large/574/584/6000198574584.jpg',
                category: ['marvel', 'superheroes']
            }
            chai
              .request(app)
              .post('/items')
              .set('token', token)
              .send(item)
              .end(function(err, res) {
                 expect(res).to.have.status(400)
                 expect(res.body).to.be.an('object');
                 expect(res.body).to.have.property('err');
                 expect(res.body.err).to.equal('Item validation failed: stock: Stock is Required');
                 done();
              })
        })
        it('should send status code of 200 even if stock key is string', function(done) {
            let item = {
                developer: 'Insomniac',
                name: 'Spider-Man',
                price: 600000,
                description: 'Top SuperHeroes Games',
                stock: '50',
                image: 'https://i5.walmartimages.ca/images/Large/574/584/6000198574584.jpg',
                category: ['marvel', 'superheroes']
            }
            chai
              .request(app)
              .post('/items')
              .set('token', token)
              .send(item)
              .end(function(err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('_id');
                expect(res.body).to.have.property('developer');
                expect(res.body).to.have.property('name');
                expect(res.body).to.have.property('price');
                expect(res.body).to.have.property('description');
                expect(res.body).to.have.property('image');
                expect(res.body).to.have.property('stock');
                expect(res.body).to.have.property('category');
                expect(res.body.developer).to.equal(item.developer);
                expect(res.body.name).to.equal(item.name);
                expect(res.body.price).to.equal(item.price);
                expect(res.body.description).to.equal(item.description);
                expect(res.body.stock).to.equal(Number(item.stock));
                expect(res.body.image).to.equal(item.image);
                done();
              })
        })
        it('should send status code of 400 if token is invalid', function(done) {
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
              .post('/items')
              .send(item)
              .set('token', `${token}invalid`)
              .end(function(err, res) {
                expect(res).to.have.status(400);
                expect(res.body).to.be.an('object');
                expect(res.body.err.name).to.equal('JsonWebTokenError');
                expect(res.body.message).to.equal('invalid token');
                done();
              })
        })
        it('should return status code of 400 if token key is not  provided', function(done) {
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
                .post('/items')
                .send(item)
                .end(function(err, res) {
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an('object');
                    expect(res.body.err.name).to.equal('JsonWebTokenError');
                    expect(res.body.err.message).to.equal('jwt must be provided');
                    expect(res.body.message).to.equal('invalid token');
                    done();
                })
        })
    })
    describe('PUT/items/:item_id', function() {
        it('should send status code of 200 while all field being updated', function(done) {
            let updated = {
                developer: 'updated_Insomniac',
                name: 'updated_Spider-Man',
                price: 500000,
                description: 'updated_Top SuperHeroes Games',
                image: 'https://i5.walmartimages.ca/images/Large/574/584/6000198574584.jpg',
                stock: 200,
                category: ['marvel', 'superheroes', 'action']
            }
            chai
              .request(app)
              .put(`/items/${itemId}`)
              .set('token', token)
              .send(updated)
              .end(function(err, res) {
                  expect(err).to.be.null;
                  expect(res).to.have.status(200);
                  expect(res.body).to.have.property('developer');
                  expect(res.body).to.have.property('name');
                  expect(res.body).to.have.property('price');
                  expect(res.body).to.have.property('description');
                  expect(res.body).to.have.property('image');
                  expect(res.body).to.have.property('stock');
                  expect(res.body).to.have.property('category'); 
                  done();   
              })
        })
        it('should send stattus code of 200 even if only a couple of field being updated', function(done) {
            let updated = {
                developer: 'updated_Insomniac',
                name: 'updated_Spider-Man',
                price: 500000,
            }
            chai
            .request(app)
            .put(`/items/${itemId}`)
            .set('token', token)
            .send(updated)
            .end(function(err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('developer');
                expect(res.body).to.have.property('name');
                expect(res.body).to.have.property('price');
                expect(res.body).to.have.property('description');
                expect(res.body).to.have.property('image');
                expect(res.body).to.have.property('stock');
                expect(res.body).to.have.property('category'); 
                done();   
            })
        })
        it('should send status code of 400 if token is invalid', function(done) {
            let updated = {
                developer: 'Insomniac2',
                name: 'Spider-Man2',
                price: 600000,
                description: 'Top SuperHeroes Games2',
                image: 'https://i5.walmartimages.ca/images/Large/574/584/6000198574584.jpg',
                stock: 50,
                category: ['marvel', 'superheroes', 'second edition']
            }
            chai
              .request(app)
              .put(`/items/${itemId}`)
              .set('token', `${token}invalidtoken`)
              .send(updated)
              .end(function(err, res) {
                expect(res).to.have.status(400);
                expect(res.body).to.be.an('object');
                expect(res.body.err.name).to.equal('JsonWebTokenError');
                expect(res.body.message).to.equal('invalid token');
                done();
              })
        })
        it('should send status code of 400 if token key is not provided', function(done) {
            let updated = {
                developer: 'Insomniac2',
                name: 'Spider-Man2',
                price: 600000,
                description: 'Top SuperHeroes Games2',
                image: 'https://i5.walmartimages.ca/images/Large/574/584/6000198574584.jpg',
                stock: 50,
                category: ['marvel', 'superheroes', 'second edition']
            }
            chai
              .request(app)
              .put(`/items/${itemId}`)
              .send(updated)
              .end(function(err, res) {
                expect(res).to.have.status(400);
                expect(res.body).to.be.an('object');
                expect(res.body.err.name).to.equal('JsonWebTokenError');
                expect(res.body.err.message).to.equal('jwt must be provided');
                expect(res.body.message).to.equal('invalid token');
                done();
              })
        })
        it('should send status code of 400 if item_id is not found', function(done) {
            let updated = {
                developer: 'Insomniac2',
                name: 'Spider-Man2',
                price: 600000,
                description: 'Top SuperHeroes Games2',
                image: 'https://i5.walmartimages.ca/images/Large/574/584/6000198574584.jpg',
                stock: 50,
                category: ['marvel', 'superheroes', 'second edition']
            }
            chai
              .request(app)
              .put(`/items/idngasal`)
              .send(updated)
              .set('token', `${token}`)
              .end(function(err, res) {
                  expect(res).have.status(400);
                  expect(res.body).to.have.property('err');
                  done();
              })

        })
    })
    describe('DELETE/items/:item_id', function() {
        it('should send status code of 400 if token key is not provided', function(done) {
            chai
              .request(app)
              .delete(`/items/${itemId}`)
              .end(function(err, res) {
                  expect(res).to.have.status(400);
                  expect(res.body).to.be.an('object');
                  expect(res.body.err.name).to.equal('JsonWebTokenError');
                  expect(res.body.err.message).to.equal('jwt must be provided');
                  expect(res.body.message).to.equal('invalid token');
                  done();
              })
        })
        it('should send status code of 400 if token is invalid', function(done) {
            chai
              .request(app)
              .delete(`/items/${itemId}`)
              .set('token', `${token}wrongtoken`)
              .end(function(err, res) {
                expect(res).to.have.status(400);
                expect(res.body).to.be.an('object');
                expect(res.body.err.name).to.equal('JsonWebTokenError');
                expect(res.body.message).to.equal('invalid token');
                done();
              })

        })
        it('should send status code of 400 if item_id does not exist', function(done) {
            chai
              .request(app)
              .delete(`/items/${itemId}wrong_id`)
              .set('token', `${token}`)
              .end(function(err, res) {
                  expect(res).to.have.status(400);
                  expect(res.body).to.be.an('object');
                  expect(res.body).to.have.property('err');
                  done();
              })
        })
        it('should send status code of 200 if item id is correct', function(done) {
          chai
            .request(app)
            .delete(`/items/${itemId}`)
            .set('token', `${token}`)
            .end(function(err, res) { 
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message');
                expect(res.body).to.have.property('item_id');
                expect(res.body.message).to.equal('success delete item');
                expect(res.body.item_id).to.equal(`${itemId}`);
                done();
            })
        })
    })
});

