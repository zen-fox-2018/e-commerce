var chai = require('chai')
var expect = require('chai').expect
var chaiHttp = require('chai-http')
var app = require('../app')
var User = require('../models/User')

chai.use(chaiHttp)

let input = {
  email: 'user1@mail.com',
  password: '123456'
}

before(function(done) {
  User.create({
    email: 'user2@mail.com',
    password: '123456'
  })
    .then(result => {
      done()
    })
    .catch(err => {
      done()
    })
})

after(function(done) {
  User.deleteMany({}, function(err) {
    done()
  })
})

describe('POST /register', function () {
  it('register should have status 201 and have property email and password', function(done) {
    chai.request(app)
    .post('/users/register')
    .send(input)
    .end(function(err, res) {
      expect(err).to.be.null;
      expect(res).to.have.status(201)
      expect(res.body).to.be.an("object");
      // expect(res.body).to.have.keys('email', 'password')
      // expect(res.body.email).to.equal('user1@mail.com')
      expect(res.body).to.have.property('_id');
      expect(res.body).to.have.property('email', input.email)
      expect(res.body.password).to.not.equal(input.password);
  
      done()
    })
  })
  
  it('should send an error object with a message and a 400 status code (duplicate email)', function(done) {
    let newInput= {
      email: 'user2@mail.com',
      password: '123456'
    }
    chai.request(app)
    .post('/users/register')
    .send(newInput)
    .end(function(err, res) {
      expect(res).to.have.status(400);
      expect(res.body).to.be.an("object");
      expect(res.body).to.have.property('errors');
      expect(res.body.errors).to.have.property('email');
      expect(res.body.errors.email.message).to.equal('Duplicate email');
  
      done()
    })
  })

  it('should send an error object with a message and a 400 status code (no email key)', function(done) {
    let newInput= {
      password: '123456'
    }
    chai.request(app)
    .post('/users/register')
    .send(newInput)
    .end(function(err, res) {
      expect(res).to.have.status(400);
      expect(res.body).to.be.an("object");
      expect(res.body).to.have.property('errors');
      expect(res.body.errors).to.have.property('email');
      expect(res.body.errors.email.message).to.equal('Email is required');
  
      done()
    })
  })

  it('should send an error object with a message and a 400 status code (email === "")', function(done) {
    let newInput= {
      email: "",
      password: '123456'
    }
    chai.request(app)
    .post('/users/register')
    .send(newInput)
    .end(function(err, res) {
      expect(res).to.have.status(400);
      expect(res.body).to.be.an("object");
      expect(res.body).to.have.property('errors');
      expect(res.body.errors).to.have.property('email');
      expect(res.body.errors.email.message).to.equal('Email is required');
  
      done()
    })
  })

  it('should send an error object with a message and a 400 status code (no password key)', function(done) {
    let newInput= {
      email: 'user2@mail.com'
    }
    chai.request(app)
    .post('/users/register')
    .send(newInput)
    .end(function(err, res) {
      expect(res).to.have.status(400);
      expect(res.body).to.be.an("object");
      expect(res.body).to.have.property('errors');
      expect(res.body.errors).to.have.property('password');
      expect(res.body.errors.password.message).to.equal('Password is required');
  
      done()
    })
  })

  it('should send an error object with a message and a 400 status code (password === "")', function(done) {
    let newInput= {
      email: 'user2@mail.com',
      password: ""
    }
    chai.request(app)
    .post('/users/register')
    .send(newInput)
    .end(function(err, res) {
      expect(res).to.have.status(400);
      expect(res.body).to.be.an("object");
      expect(res.body).to.have.property('errors');
      expect(res.body.errors).to.have.property('password');
      expect(res.body.errors.password.message).to.equal('Password is required');
  
      done()
    })
  })

  it('should send an error object with messages and a 400 status code (no email and password keys)', function(done) {
    let newInput= {}
    chai.request(app)
    .post('/users/register')
    .send(newInput)
    .end(function(err, res) {
      expect(res).to.have.status(400);
      expect(res.body).to.be.an("object");
      expect(res.body).to.have.property('errors');
      expect(res.body.errors).to.have.property("email");
      expect(res.body.errors.email.message).to.equal("Email is required");
      expect(res.body.errors).to.have.property('password');
      expect(res.body.errors.password.message).to.equal('Password is required');
  
      done()
    })
  })

  it('should send an error object with messages and a 400 status code (email === "" and password === "")', function(done) {
    let newInput= {
      email: "",
      password: ""
    }
    chai.request(app)
    .post('/users/register')
    .send(newInput)
    .end(function(err, res) {
      expect(res).to.have.status(400);
      expect(res.body).to.be.an("object");
      expect(res.body).to.have.property('errors');
      expect(res.body.errors).to.have.property("email");
      expect(res.body.errors.email.message).to.equal("Email is required");
      expect(res.body.errors).to.have.property('password');
      expect(res.body.errors.password.message).to.equal('Password is required');
  
      done()
    })
  })
})

describe('POST /login', function () {
  it('login should return access_token with status 200', function(done) {
    chai.request(app)
    .post('/users/login')
    .send(input)
    .end(function(err, res) {
      expect(err).to.be.null;
      expect(res).to.have.status(200)
      expect(res.body).to.have.property('access_token')
  
      done()
    })
  })
})
