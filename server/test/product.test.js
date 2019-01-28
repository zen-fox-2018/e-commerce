const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app')

chai.use(chaiHttp)
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Product = require('../models/Product')

let newProduct1 = {
  name: 'Product1',
  description: 'desc1',
  price: 1000,
  stock: 10,
}

let newProduct2 = {
  name: 'Product2',
  description: 'desc2',
  price: 2000,
  stock: 20,
}

let newUser1 = {
  name: 'Anhar1',
  email: "anhar1@mail.com",
  password: "1234"
}

let newUser2 = {
  name: 'Anhar2',
  email: "anhar2@mail.com",
  password: "1234"
}

var token1 = ''
var token2 = ''
let User1 = {}
let User2 = {}
var dataproduct1 = {}
var dataproduct2 = {}

describe('Product Test', function () {
  before(function(done){
    User.create(newUser1)
    .then( user1 => {
      User1 = user1
      token1 = jwt.sign({email: user1.email}, process.env.JWT_SECRET)
      return User.create(newUser2)
    })
    .then( user2 => {
      User2 = user2
      token2 = jwt.sign({email: user2.email}, process.env.JWT_SECRET)
      newProduct1.userId = user2._id
      return Product.create(newProduct1)
    })
    .then( product1 => {
      dataproduct1 = product1
      done()
    })
    .catch( error => { done() })
  })

  after(function (done) {
    //delete database
    User.deleteMany({})
      .then(users => {
        done()
      })
      .catch(error => {
        done()
      })
  })

  describe('GET /products', function () {
    it('should get all product with status 200', function (done) {
      chai
        .request(app)
        .get('/products')
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res.body).to.be.an('array')
          done()
        })
    })
  })

  describe('POST /products', function () {
    it('should return new product with status 201', function (done) {
      chai
        .request(app)
        .post('/products')
        .set({
          token: token1
        })
        .type('form')
        .send({
          'data': JSON.stringify(newProduct1)
        })
        // .send(newProduct1)
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res.body).to.have.property('product')
          expect(res.body).to.have.property('message')
          expect(res.body.product).to.be.an('Object')
          expect(res.body.message).to.equal('Success add product')
          done()
        })
    })

    it('should return error with status 401 if user not login yet', function (done) {
      chai
        .request(app)
        .post('/products')
        .set({
          token: null
        })
        .send(newProduct1)
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res.body).to.have.property('message')
          expect(res.body.message).to.equal('please login first')
          done()
        })
    })

    it('should return error with status 401 if token invalid', function (done) {
      chai
        .request(app)
        .post('/products')
        .set({
          token: 'tokencobacoba'
        })
        .send(newProduct1)
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res.body).to.have.property('message')
          expect(res.body.message).to.equal('please login first')
          done()
        })
    })
  })

  describe('PUT /products/:productId', function () {
    let editProduct = {
      name: 'edit1',
      description: 'editdesc1',
      price: 2000,
      stock: 20,
    }
    it('should return edited product with status 200', function (done) {
      chai
        .request(app)
        .put(`/products/${dataproduct1._id}`)
        .type('form')
        .send({
          'data': JSON.stringify(editProduct)
        })
        .set({
          token: token2
        })
        // .send(editProduct)
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res.body).to.have.property('product')
          expect(res.body.product.name).to.equal(editProduct.name)
          expect(res.body.product.description).to.equal(editProduct.description)
          expect(res.body.product.price).to.equal(editProduct.price)
          expect(res.body.product.stock).to.equal(editProduct.stock)
          expect(res.body).to.have.property('message')
          expect(res.body.message).to.equal('Success edit product')
          done()
        })
    })

    it('should return error with status 401 if user not login yet', function (done) {
      chai
        .request(app)
        .put(`/products/${dataproduct1._id}`)
        .set({
          token: null
        })
        .send(editProduct)
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res.body).to.have.property('message')
          expect(res.body.message).to.equal('please login first')
          done()
        })
    })

    it('should return error with status 400 if user is not the owner', function (done) {
      chai
        .request(app)
        .put(`/products/${dataproduct1._id}`)
        .set({
          token: token1
        })
        .send(editProduct)
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res.body).to.have.property('message')
          expect(res.body.message).to.equal('not yours')
          done()
        })
    })

    it('should return error with status 400 if product not found', function (done) {
      chai
        .request(app)
        .put(`/products/productcobacoba`)
        .set({
          token: token2
        })
        .send(editProduct)
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res.body).to.have.property('message')
          expect(res.body.message).to.equal('Internal Server Error')
          done()
        })
    })
  })

  describe('DELETE /products/:productId', function () {
    beforeEach(function (done) {
      newProduct2.userId = User2._id
      Product.create(newProduct2)
        .then(product => {
          dataproduct2 = product
          done()
        })
        .catch(error => { done() })
    })
    it('should success delete and return message with status 200', function (done) {
      chai
        .request(app)
        .delete(`/products/${dataproduct2._id}`)
        .set({
          token: token2
        })
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res.body).to.have.property('message')
          expect(res.body.message).to.equal('Success delete product')
          done()
        })
    })

    it('should return error with status 401 if user not login yet', function (done) {
      chai
        .request(app)
        .delete(`/products/${dataproduct2._id}`)
        .set({
          token: null
        })
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res.body).to.have.property('message')
          expect(res.body.message).to.equal('please login first')
          done()
        })
    })

    it('should return error with status 400 if user is not the owner', function (done) {
      chai
        .request(app)
        .delete(`/products/${dataproduct2._id}`)
        .set({
          token: token1
        })
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res.body).to.have.property('message')
          expect(res.body.message).to.equal('not yours')
          done()
        })
    })

    it('should return error with status 400 if product not found', function (done) {
      chai
        .request(app)
        .delete(`/products/producttes`)
        .set({
          token: token2
        })
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res.body).to.have.property('message')
          expect(res.body.message).to.equal('Internal Server Error')
          done()
        })
    })
  })
})