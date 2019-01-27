const app = require('../app.js');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const Product = require('../models/product');
const User = require('../models/user');
const {generateToken} = require('../helpers/helper');

chai.use(chaiHttp)

describe('Products', function() {
  let user = {}
  let token = ''
  beforeEach((done) => {
    User.create({
      name: 'Jono',
      email: 'Jono@mail.com',
      password: 'asdqwezxc'
    })
    .then(user => {
      user = user
      token = generateToken(user._id, user.email)
      // return {user: user, access_token: generateToken(user._id, user.email)}
      done()
    })
    .catch(err => {
      done()
    })
  })
  
  let unAuthorizeUser = {}
  let unAuthorizeToken = ''
  beforeEach((done) => {
    User.create({
      name: 'joni',
      email: 'joni@mail.com',
      password: 'asdqwezxc'
    })
      .then(userFail => {
        unAuthorizeUser = userFail
        unAuthorizeToken = generateToken(userFail._id, userFail.email)
        done()
      })
      .catch(err => {
        done()
      })
  })
  
  after(function(done) {
    Product.deleteMany({})
      .then(() => {
        done()
      })
      .catch(err => {
        done()
      })
  })
  let option = {
    name: 'Pohon Jati',
    price: 3000000,
    stock: 100,
    category: 'Pohon',
    // image: 'https://storage.cloud.google.com/bucket-mini-wp/1547954706138logo.png?_ga=2.199571054.-1110024912.1547867391',
  }
  var dataProductId
  describe('POST /products', function() {
    it('Should return new product', function(done) {
      chai.request(app)
      .post('/products')
      .set('access_token', token)
      .send(option)
      .end(function(err, res) {
        console.log(res.body)
        expect(err).to.be.null
        expect(res).to.have.status(201)
        expect(res.body).to.have.property('name')
        expect(res.body).to.have.property('price')
        expect(res.body).to.have.property('stock')
        expect(res.body).to.have.property('user')
        // expect(res.body).to.have.property('image')
        expect(res.body.name).to.equal(option.name)
        expect(res.body.price).to.equal(option.price)
        expect(res.body.stock).to.equal(option.stock)
        // expect(res.body.user).to.equal(user._id)
        // expect(res.body.name).to.equal(option.image)
        dataProductId = res.body._id
        done()
      })
    })

    it('Should return an error with status code 406', function(done) {
      chai.request(app)
      .post('/products')
      .set('access_token', 'mwqmd3n112enn2e3h1n45b')
      .send(option)
      .end(function(err, res) {
        expect(err).to.be.null
        expect(res).to.have.status(500)
        done()
      })
    })
  })

  
  describe('GET /products', function() {
    it('Should return an array of products', function(done) {
      chai.request(app)
      .get('/products')
      .set('access_token', token)
      .send(option)
      .end(function(err, res) {
        expect(res).to.have.status(200)
        expect(res.body[0]).to.have.property('name')
        expect(res.body[0]).to.have.property('price')
        expect(res.body[0]).to.have.property('stock')
        done()
      })
    })

    it('Should return an error with status code 406', function(done) {
      chai.request(app)
      .get('/products')
      .set('access_token', 'mwqmd3n112enn2e3h1n45b')
      .end(function(err, res) {
        expect(err).to.be.null
        expect(res).to.have.status(500)
        done()
      })
    })
  })
  
  describe('PUT /products/:id', function() {
    let dataUpdate = {
      name: 'Pohon Toge',
      price: 3000000,
      stock: 100,
      category: 'Pohon',
      // image: 'https://storage.cloud.google.com/bucket-mini-wp/1547954706138logo.png?_ga=2.199571054.-1110024912.1547867391',
    }
    it('Should return an object product updated', function(done) {
      chai.request(app)
      .put(`/products/${dataProductId}`)
      .set('access_token', token)
      .send(dataUpdate)
      .end(function(err, res) {
        expect(err).to.be.null
        expect(res).to.have.status(201)
        expect(res.body).to.have.property('name')
        expect(res.body).to.have.property('price')
        expect(res.body).to.have.property('stock')
        expect(res.body).to.have.property('user')
        // expect(res.body).to.have.property('image')
        expect(res.body.name).to.equal(dataUpdate.name)
        expect(res.body.price).to.equal(dataUpdate.price)
        expect(res.body.stock).to.equal(dataUpdate.stock)
        done()
      })
    })

    it('Should return an error with status code 406', function(done) {
      chai.request(app)
      .put(`/products/${dataProductId}`)
      .set('access_token', 'mwqmd3n112enn2e3h1n45b')
      .send(option)
      .end(function(err, res) {
        expect(err).to.be.null
        expect(res).to.have.status(500)
        done()
      })
    })

    it('Should return an error with status code 401', function(done) {
      chai.request(app)
      .put(`/products/${dataProductId}`)
      .set('access_token', unAuthorizeToken)
      .send(option)
      .end(function(err, res) {
        expect(err).to.be.null
        expect(res).to.have.status(401)
        done()
      })
    })
  })
  
  describe('DELETE /products/:id', function() {
    it('Should return an id product deleted', function(done) {
      chai.request(app)
      .delete(`/products/${dataProductId}`)
      .set('access_token', token)
      .end(function(err, res) {
        console.log(res.body)
        expect(err).to.be.null
        expect(res).to.have.status(200)
        expect(res.body).to.have.property('id')
        done()
      })
    })

    it('Should return an error with status code 406', function(done) {
      chai.request(app)
      .delete(`/products/${dataProductId}`)
      .set('access_token', unAuthorizeToken)
      .send(option)
      .end(function(err, res) {
        expect(err).to.be.null
        expect(res).to.have.status(500)
        done()
      })
    })
  })
  
})
