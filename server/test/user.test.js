const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app')
const User = require('../models/User')
chai.use(chaiHttp)

let newUserTest = {
  name: 'Anhar',
  email: "anhar@mail.com",
  password: "1234"
}


describe('User Test', function () {

  beforeEach(function (done) {
    //create User (to check register unique email, login)
    User.create(newUserTest)
      .then(user => {
        done()
      })
      .catch(error => {
        done()
      })
  })

  afterEach(function (done) {
    //delete database
    User.deleteMany({})
      .then(users => {
        done()
      })
      .catch(error => {
        done()
      })
  })

  describe('POST /register', function () {
    let newUser2 = {
      name: 'AnharAF',
      email: "anharaf@mail.com",
      password: "1234"
    }

    it('should return new user data with response status 201', function (done) {
      chai
        .request(app)
        .post('/register')
        .send(newUser2)
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(201)
          expect(res.body.user).to.have.property('name')
          expect(res.body.user).to.have.property('email')
          expect(res.body.user.name).to.equal(newUser2.name)
          expect(res.body.user.email).to.equal(newUser2.email)
          expect(res.body).to.have.property('message')
          expect(res.body.message).to.equal('Success register, please login to continue')
          done()
        })
    })

    it('should return error with status 400 if password is empty', function (done) {
      newUser2.password = ''
      chai
        .request(app)
        .post('/register')
        .send(newUser2)
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.have.property('message')
          expect(res.body.message).to.equal("password must be filled")
          done()
        })
    })
    it('should return error with status 400 if email is empty', function (done) {
      newUser2.email = ''
      newUser2.password = '1234'
      chai
        .request(app)
        .post('/register')
        .send(newUser2)
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.have.property('message')
          expect(res.body.message).to.equal("email must be filled")
          done()
        })
    })

    it('should return error with status 400 if email is used', function (done) {
      chai
        .request(app)
        .post('/register')
        .send(newUserTest)
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.have.property('message')
          expect(res.body.message).to.equal("email is used")
          done()
        })
    })

    it('should return error with status 400 if format email is wrong', function (done) {
      newUser2.email = 'anhar@mail.c'
      chai
        .request(app)
        .post('/register')
        .send(newUser2)
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.have.property('message')
          expect(res.body.message).to.equal("Please fill a valid email address")
          done()
        })
    })
  })

  describe('POST /login', function () {
    let user = {
      email: "anhar@mail.com",
      password: '1234'
    }

    it('should return token with status 200', function (done) {
      chai
        .request(app)
        .post('/login')
        .send(user)
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.have.property('token')
          expect(res.body).to.have.property('message')
          expect(res.body.message).to.equal('Success login')
          done()
        })
    })
    it('should return error message if email not found in database', function (done) {
      user.email = 'anhar22@mail.com'
      chai
        .request(app)
        .post('/login')
        .send(user)
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.have.property('message')
          expect(res.body.message).to.equal('wrong email/password')
          done()
        })
    })
    it('should return error message if password is wrong', function (done) {
      user.email = 'anhar@mail.com'
      user.password = '12345'
      chai
        .request(app)
        .post('/login')
        .send(user)
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.have.property('message')
          expect(res.body.message).to.equal('wrong email/password')
          done()
        })
    })
  })

})


  // describe('POST /loginGoogle', function(){
  //   it('', function(done){

  //   })
  //   it('', function(done){

  //   })
  // })