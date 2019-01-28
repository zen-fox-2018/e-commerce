const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app')

chai.use(chaiHttp)
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Product = require('../models/Product')
const Cart = require('../models/Cart')
const Transaction = require('../models/Transaction')

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
var dataTransaction = {}

describe('Transaction Test', function () {
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
    Cart.create({userId: User3._id, productId: dataproduct3._id, quantity: 1})
      .then( cart => { 
        dataCart = cart
        return Transaction.create({userId: User3._id, productId: [dataCart._id], total: 10000})
      })
      .then( transaction => {
        dataTransaction = transaction
        done()
      })
      .catch( error => { done() })
  })

  afterEach(function(done){
    Cart.deleteMany()
      .then( cart => { 
        return Transaction.deleteMany()
      })
      .then( data => {
        done()
      })
      .catch( error => { done() })
  })

  describe('GET /transactions', function(){
    it('should return all transaction history from all customers', function(done){
      chai
          .request(app)
          .get('/transactions')
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

    it('should return all my transaction history', function(done){
      chai
          .request(app)
          .get('/transactions/me')
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
          .get('/transactions/me')
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

  describe('POST /transactions', function(){
    it('should return new transaction data', function(done){
      chai
          .request(app)
          .post('/transactions')
          .set({
            token: token3
          })
          .send({
            productId: [dataproduct3._id],
            total: 20000
          })
          .end(function(err,res){
            expect(err).to.be.null
            expect(res).to.have.status(201)
            expect(res.body).to.be.an('object')
            expect(res.body).to.have.property('message')
            expect(res.body.message).to.equal('success buy')
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
            productId: [dataproduct3._id],
            total: 20000
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

  describe('PUT /transactions/:transactionId (confirm received product)', function(){
    it('should change status to "Selesai"', function(done){
      chai
          .request(app)
          .put(`/transactions/${dataTransaction._id}`)
          .set({
            token: token3
          })
          .send({status: "Selesai"})
          .end(function(err,res){
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body).to.have.property('transaction')
            expect(res.body.transaction).to.have.property('status')
            expect(res.body.transaction.status).to.equal('Selesai')
            expect(res.body).to.have.property('message')
            expect(res.body.message).to.equal('Transaksi berhasil')
            done()
          })
    })
    it('should return error if user not login', function(done){
      chai
        .request(app)
        .put(`/transactions/${dataTransaction._id}`)
        .set({
          token: null
        })
        .send({status: "Selesai"})
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