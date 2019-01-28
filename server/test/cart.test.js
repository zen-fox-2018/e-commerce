const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app')

chai.use(chaiHttp)
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Product = require('../models/Product')
const Cart = require('../models/Cart')

let newProduct3 = {
  name: 'Product3',
  description: 'desc3',
  price: 3000,
  stock: 30,
}

let newProduct4 = {
  name: 'Product4',
  description: 'desc4',
  price: 4000,
  stock: 40,
}

let newUser3 = {
  name: 'Anhar3',
  email: "anhar3@mail.com",
  password: "1234"
}

let newUser4 = {
  name: 'Anhar4',
  email: "anhar4@mail.com",
  password: "1234"
}

var token3 = ''
var token4 = ''
let User3 = {}
let User4 = {}
var dataproduct3 = {}
var dataproduct4 = {}
var dataCart = {}

describe('Cart Test', function () {
  before(function(done){
    User.create(newUser3)
    .then( user3 => {
      User3 = user3
      token3 = jwt.sign({email: user3.email}, process.env.JWT_SECRET)
      return User.create(newUser4)
    })
    .then( user4 => {
      User4 = user4
      token4 = jwt.sign({email: user4.email}, process.env.JWT_SECRET)
      newProduct3.userId = user4._id // User4 Add Product3
      return Product.create(newProduct3)
    })
    .then( product3 => {
      dataproduct3 = product3
      done()
      // [User3, token3, User4, token4, dataproduct3]
    })
    .catch( error => { done() })
  })

  beforeEach(function(done){
    //user3 add product3 to cart
    // User.findByIdAndUpdate(User3._id, { $push: { cart: dataproduct3._id } })
    Cart.create({userId: User3._id, productId: dataproduct3._id, quantity: 1})
      .then( cart => { 
        dataCart = cart
        done()
      })
      .catch( error => { done() })
  })

  afterEach(function(done){
    // User.findByIdAndUpdate(User3._id, { $pull: { cart: dataproduct3._id } })
    Cart.deleteMany()
      .then( cart => { done() })
      .catch( error => { done() })
  })

  describe('GET /cart', function(){
    it('should return all product in own cart', function(done){
      chai
          .request(app)
          .get('/cart')
          .set({
            token: token3
          })
          .end(function(err,res){
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('array')
            done()
          })
    })
    it('should return error if user not login', function(done){
      chai
          .request(app)
          .get('/cart')
          .set({
            token: null
          })
          .end(function(err,res){
            expect(err).to.be.null
            expect(res).to.have.status(401)
            expect(res.body).to.have.property('message')
            expect(res.body.message).to.equal('please login first')
            done()
          })
    })
  })

  describe('POST /cart', function(){
    it('should return new item on cart', function(done){
      chai
          .request(app)
          .post('/cart')
          .set({
            token: token4
          })
          .send({
            productId: dataproduct3._id
          })
          .end(function(err,res){
            expect(err).to.be.null
            expect(res).to.have.status(201)
            expect(res.body).to.be.an('object')
            expect(res.body.cart).to.have.property('productId')
            done()
          })
    })
    it('should return error if user not login', function(done){
      chai
          .request(app)
          .post('/cart')
          .set({
            token: null
          })
          .send({
            productId: dataproduct3._id
          })
          .end(function(err,res){
            expect(err).to.be.null
            expect(res).to.have.status(401)
            expect(res.body).to.have.property('message')
            expect(res.body.message).to.equal('please login first')
            done()
          })
    })
  })

  describe('PUT /cart/:cartId (delete item on cart)', function(){
    it('should delete an item on cart', function(done){
      chai
          .request(app)
          .put(`/cart/${dataCart._id}`)
          .set({
            token: token3
          })
          .end(function(err,res){
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body).to.have.property('message')
            expect(res.body.message).to.equal('delete item from cart')
            done()
          })
    })
    it('should return error if user not login', function(done){
      chai
        .request(app)
        .put(`/cart/${dataCart._id}`)
        .set({
          token: null
        })
        .end(function(err,res){
          expect(err).to.be.null
          expect(res).to.have.status(401)
          expect(res.body).to.have.property('message')
          expect(res.body.message).to.equal('please login first')
          done()
        })
    })
  })

  describe('PUT /cart/:cartId/plus (add quantity item on cart)', function(){
    it('should pluss quantity item on cart', function(done){
      chai
          .request(app)
          .put(`/cart/${dataCart._id}/plus`)
          .set({
            token: token3
          })
          .end(function(err,res){
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body).to.have.property('message')
            expect(res.body.message).to.equal('add quantity item')
            done()
          })
    })
    it('should return error if user not login', function(done){
      chai
        .request(app)
        .put(`/cart/${dataCart._id}`)
        .set({
          token: null
        })
        .end(function(err,res){
          expect(err).to.be.null
          expect(res).to.have.status(401)
          expect(res.body).to.have.property('message')
          expect(res.body.message).to.equal('please login first')
          done()
        })
    })
  })

  describe('PUT /cart/:cartId/minus (reduce quantity item on cart)', function(){
    it('should delete an item on cart', function(done){
      chai
          .request(app)
          .put(`/cart/${dataCart._id}/minus`)
          .set({
            token: token3
          })
          .end(function(err,res){
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body).to.have.property('message')
            expect(res.body.message).to.equal('reduce quantity item')
            done()
          })
    })
    it('should return error if user not login', function(done){
      chai
        .request(app)
        .put(`/cart/${dataCart._id}`)
        .set({
          token: null
        })
        .end(function(err,res){
          expect(err).to.be.null
          expect(res).to.have.status(401)
          expect(res.body).to.have.property('message')
          expect(res.body.message).to.equal('please login first')
          done()
        })
    })
  })
})