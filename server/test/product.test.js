var chai = require('chai')
var expect = require('chai').expect
var chaiHttp = require('chai-http')
var app = require('../app')
var Product = require('../models/Product')

chai.use(chaiHttp)

let input = {
  name:  "painting",
  description: "this is a painting",
  price: 20000,
  imageUrl: 'https://storage.googleapis.com/upload-file.ribka.online/1548045056452aerial-climate-cold-296559.jpg'
}

before(function(done) {
  Product.create(input)
    .then(result => {
      done()
    })
    .catch(err => {
      done()
    })
})

after(function(done) {
  Product.deleteMany({}, function(err) {
    done()
  })
})

describe('GET /products', function () {
  it('should send an array and a 200 status code', function(done) {
    chai.request(app)
    .get('/products')
    .send(input)
    .end(function(err, res) {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
  
      done()
    })
  })

})

describe.only('POST /products', function () {
  it('create should have status 201 and have property name, description, price, imageUrl', function(done) {
    chai.request(app)
    .post('/products')
    .send(input)
    .end(function(err, res) {
      expect(err).to.be.null;
      expect(res).to.have.status(201)
      expect(res.body).to.be.an("object");
      expect(res.body).to.have.property('_id');
      expect(res.body).to.have.property('name', input.name)
      expect(res.body).to.have.property('description', input.description)
      expect(res.body).to.have.property('price', input.price)
      expect(res.body).to.have.property('imageUrl', input.imageUrl)
  
      done()
    })
  })

  it('should send an error object with a message and a 400 status code (no name key)', function(done) {
    let newInput = {
      description: "this is a painting",
      price: 20000,
      imageUrl: 'https://storage.googleapis.com/upload-file.ribka.online/1548045056452aerial-climate-cold-296559.jpg'
    }

    chai.request(app)
    .post('/products')
    .send(newInput)
    .end(function(err, res) {
      expect(res).to.have.status(400);
      expect(res.body).to.be.an("object");
      expect(res.body).to.have.property('errors')
      expect(res.body.errors).to.have.property('name');
      expect(res.body.errors.name.message).to.equal('name should not be empty');
  
      done()
    })    
  })

  it('should send an error object with a message and a 400 status code (name === "")', function(done) {
    let newInput = {
      name: '',
      description: "this is a painting",
      price: 20000,
      imageUrl: 'https://storage.googleapis.com/upload-file.ribka.online/1548045056452aerial-climate-cold-296559.jpg'
    }

    chai.request(app)
    .post('/products')
    .send(newInput)
    .end(function(err, res) {
      expect(res).to.have.status(400);
      expect(res.body).to.be.an("object");
      expect(res.body).to.have.property('errors')
      expect(res.body.errors).to.have.property('name');
      expect(res.body.errors.name.message).to.equal('name should not be empty');
  
      done()
    })
  })

  it('should send an error object with a message and a 400 status code (no description key)', function(done) {
    let newInput = {
      name: 'painting',
      price: 200000,
      imageUrl: 'https://storage.googleapis.com/upload-file.ribka.online/1548045056452aerial-climate-cold-296559.jpg'
    }

    chai.request(app)
    .post('/products')
    .send(newInput)
    .end(function(err, res) {
      expect(res).to.have.status(400);
      expect(res.body).to.be.an("object");
      expect(res.body).to.have.property('errors')
      expect(res.body.errors).to.have.property('description');
      expect(res.body.errors.description.message).to.equal('description should not be empty');
  
      done()
    })
  })  

  it('should send an error object with a message and a 400 status code (description === "")', function(done) {
    let newInput = {
      name: 'painting',
      description: '',
      price: 200000,
      imageUrl: 'https://storage.googleapis.com/upload-file.ribka.online/1548045056452aerial-climate-cold-296559.jpg'
    }

    chai.request(app)
    .post('/products')
    .send(newInput)
    .end(function(err, res) {
      expect(res).to.have.status(400);
      expect(res.body).to.be.an("object");
      expect(res.body).to.have.property('errors')
      expect(res.body.errors).to.have.property('price');
      expect(res.body.errors.price.message).to.equal('price should not be empty');
  
      done()
    })
  })

  it('should send an error object with a message and a 400 status code (no price key)', function(done) {
    let newInput = {
      name: 'painting',
      description: 'this is a painting',
      imageUrl: 'https://storage.googleapis.com/upload-file.ribka.online/1548045056452aerial-climate-cold-296559.jpg'
    }

    chai.request(app)
    .post('/products')
    .send(newInput)
    .end(function(err, res) {
      expect(res).to.have.status(400);
      expect(res.body).to.be.an("object");
      expect(res.body).to.have.property('errors')
      expect(res.body.errors).to.have.property('price');
      expect(res.body.errors.price.message).to.equal('price should not be empty');
  
      done()
    })
  })

  it('should send an error object with a message and a 400 status code (price === "")', function(done) {
    let newInput = {
      name: 'painting',
      description: 'this is a painting',
      price: '',
      imageUrl: 'https://storage.googleapis.com/upload-file.ribka.online/1548045056452aerial-climate-cold-296559.jpg'
    }

    chai.request(app)
    .post('/products')
    .send(newInput)
    .end(function(err, res) {
      expect(res).to.have.status(400);
      expect(res.body).to.be.an("object");
      expect(res.body).to.have.property('errors')
      expect(res.body.errors).to.have.property('price');
      expect(res.body.errors.price.message).to.equal('price should not be empty');
  
      done()
    })
  })
})