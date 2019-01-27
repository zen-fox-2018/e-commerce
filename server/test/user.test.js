const app = require('../app.js');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const User = require('../models/user');

chai.use(chaiHttp);


function createUser() {
  return User.create({
    name: 'faishal',
    email: 'unique@mail.com',
    password: 'asdqwezxc'
  })
}

after(function(done) {
  User.deleteMany({})
    .then(() => {
      done()
    })
    .catch(() => {
      done()
    })
})


describe('POST user/register', function() {
  beforeEach(function(done) {
    createUser()
      .then(user => {
        done()
      })
      .catch(err => {
        done()
      })
  })
  afterEach(function(done) {
    User.deleteMany({})
      .then(() => {
        done()
      })
      .catch(() => {
        done()
      })
  })
  it('Should return new user with status code 201', function(done) {
    const option = {
      name: 'Mochamad Faishal Amir',
      email: 'faishal@mail.com',
      password: 'asdqwezxc',
    }

    chai.request(app)
    .post('/users/register')
    .send(option)
    .end(function(err, res) {
      expect(err).to.be.null
      expect(res).to.have.status(201)
      expect(res.body).to.have.property('name')
      expect(res.body).to.have.property('email')
      expect(res.body).to.have.property('password')
      expect(res.body).to.be.an('object')
      expect(res.body.name).to.equal(option.name)
      expect(res.body.email).to.equal(option.email)
      expect(res.body.email).to.not.equal(option.password)
      done()
    })
  })

  it('Should return new user with status code 400', function(done) {
    const option = {
      name: 'Mochamad Faishal Amir',
      email: 'unique@mail.com',
      password: 'asdqwezxc',
    }
    chai.request(app)
    .post('/users/register')
    .send(option)
    .end(function(err, res) {
      console.log(res.body)
      expect(err).to.be.null
      expect(res).to.have.status(400)
      expect(res.body).to.have.property('msg')
      expect(res.body.msg).to.equal('User validation failed: email: Email aready registered')

      done()
    })
  })

  it('Should return a message with status code 400', function (done) {
    const option = {
      name: '',
      email: 'faishal@mail.com',
      password: 'asdqwezxc',
    }

    chai.request(app)
    .post('/users/register')
    .send(option)
    .end(function(err, res) {
      expect(res).to.have.status(400)
      expect(res.body).to.have.property('msg')
      expect(res.body.msg).to.equal('User validation failed: name: Path `name` is required.')
      done()
    })
  })

  it('Should return a message with status code 400', function(done) {
    const option = {
      name: 'Mochamad Faishal Amir',
      email: '',
      password: 'asdqwezxc',
    }

    chai.request(app)
    .post('/users/register')
    .send(option)
    .end(function(err, res) {
      expect(res).to.have.status(400)
      expect(res.body).to.have.property('msg')
      expect(res.body.msg).to.equal('User validation failed: email: Path `email` is required.')
      done()
    })
  })

  it('Should return a message with status code 400', function(done) {
    const option = {
      name: 'Mochamad Faishal Amir',
      email: 'faishalmail.com',
      password: 'asdqwezxc',
    }

    chai.request(app)
    .post('/users/register')
    .send(option)
    .end(function(err, res) {
      expect(res).to.have.status(400)
      expect(res.body.msg).to.equal('User validation failed: email: Invalid email')
      done()
    })
  })

  it('Should return a message with status code 400', function(done) {
    const option = {
      name: 'Mochamad Faishal Amir',
      email: '@mail.com',
      password: 'asdqwezxc',
    }

    chai.request(app)
    .post('/users/register')
    .send(option)
    .end(function(err, res) {
      expect(res).to.have.status(400)
      expect(res.body.msg).to.equal('User validation failed: email: Invalid email')
      done()
    })
  })

  it('Should return a message with status code 400', function(done) {
    const option = {
      name: 'Mochamad Faishal Amir',
      email: 'faishal@mail.com',
      password: '',
    }

    chai.request(app)
    .post('/users/register')
    .send(option)
    .end(function(err, res) {
      expect(res).to.have.status(400)
      expect(res.body.msg).to.equal('User validation failed: password: Password minimum length is 8')
      done()
    })
  })

  it('Should return a message with status code 400', function(done) {
    const option = {
      name: 'Mochamad Faishal Amir',
      email: 'faishal@mail.com',
      password: 'adwds',
    }

    chai.request(app)
    .post('/users/register')
    .send(option)
    .end(function(err, res) {
      expect(res).to.have.status(400)
      expect(res.body.msg).to.equal('User validation failed: password: Password minimum length is 8')
      done()
    })
  })
  
})

describe('POST users/login', function() {  
  before(function(done) {
    createUser()
      .then(() => {
        done()
      })
      .catch(() => {
        done()
      })
  })
  it('Should return token and data user logged in with status code 200', function(done) {
    let option = {
      email: 'unique@mail.com',
      password: 'asdqwezxc'
    }

    chai.request(app)
    .post('/users/login')
    .send(option)
    .end(function(err, res) {
      expect(err).to.be.null
      expect(res).to.have.status(200)
      expect(res.body).to.have.property('access_token')
      expect(res.body).to.have.property('user')
      expect(res.body).to.be.an('object')
      expect(res.body.user.email).to.equal(option.email)
      done()
    })
  })

  it('Should return a message with status code 400', function(done) {
    let option = {
      email: 'unique@mail.c',
      password: 'asdqwezxc'
    }

    chai.request(app)
    .post('/users/login')
    .send(option)
    .end(function(err, res) {
      expect(res).to.have.status(400)
      expect(res.body).to.be.an('object')
      expect(res.body.msg).to.equal('Authentication failed, wrong email/password')
      done()
    })
  })

  it('Should return a message with status code 400', function(done) {
    let option = {
      email: 'unique@mail.com',
      password: 'asdqwez'
    }

    chai.request(app)
    .post('/users/login')
    .send(option)
    .end(function(err, res) {
      expect(res).to.have.status(400)
      expect(res.body).to.be.an('object')
      expect(res.body.msg).to.equal("Authentication failed, wrong email/password")
      done()
    })
  })
})