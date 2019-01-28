const app = require('../app')
const chai = require('chai')
const { clearDBUser } = require('../helpers/index.test')
const chaiHttp = require('chai-http')
const { expect } = require('chai')


chai.use(chaiHttp)

after(function (done) {
    clearDBUser(done)
})

describe('TESTING FOR USER', function () {
    describe('User register', function () {
        it('should return a object of new user with status code 201', function (done) {
            let newUser = {
                name: 'khevin',
                email: 'khevin@mail.com',
                password: '123456',
            }
            chai
                .request(app)
                .post('/users/user')
                .send(newUser)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(201)
                    expect(res).to.be.an('object')
                    expect(res.body).to.have.property('name')
                    expect(res.body).to.have.property('email')
                    expect(res.body).to.have.property('password')
                    done()
                })
        })
        it('should return a string when key name is empty with status code 400', function (done) {
            let newUser = {
                name: '',
                email: 'khevin@mail.com',
                password: '123456',
            }
            chai
                .request(app)
                .post('/users/user')
                .send(newUser)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('string')
                    expect(res.body).to.equal('Name must be filled!')
                    done()
                })
        })
        it('should return a string when key email is empty with status code 400', function (done) {
            let newUser = {
                name: 'khevin',
                email: '',
                password: '123456',
            }
            chai
                .request(app)
                .post('/users/user')
                .send(newUser)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('string')
                    expect(res.body).to.equal('Email must be filled!')
                    done()
                })
        })
        it('should return a string when input email format is invalid with status code 400', function (done) {
            let newUser = {
                name: 'khevin',
                email: 'khevinmail.com',
                password: '123456',
            }
            chai
                .request(app)
                .post('/users/user')
                .send(newUser)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('string')
                    expect(res.body).to.equal('Please fill a valid email address')
                    done()
                })
        })
        it('should return a string when input email is not unique with status code 400', function (done) {
            let newUser = {
                name: 'khevin',
                email: 'khevin@mail.com',
                password: '123456'
            }
            chai
                .request(app)
                .post('/users/user')
                .send(newUser)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('string')
                    expect(res.body).to.be.equal('Email already exists!')
                    done()
                })
        })
        it('should return a string when input password is empty with status code 400', function (done) {
            let newUser = {
                name: 'khevin',
                email: 'khevin1@mail.com',
                password: '',
            }
            chai
                .request(app)
                .post('/users/user')
                .send(newUser)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('string')
                    expect(res.body).to.equal('Password must be filled!')
                    done()
                })
        })
        it('should return a string when input password length less than 6 characters with status code 400', function (done) {
            let newUser = {
                name: 'khevin',
                email: 'khevin1@mail.com',
                password: '123',
            }
            chai
                .request(app)
                .post('/users/user')
                .send(newUser)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('string')
                    expect(res.body).to.equal('Failed, minimal input password 6 characters')
                    done()
                })
        })
    })
    describe('User Login', function () {
        it('should return an object that have property key token and user profile with status code 200', function (done) {
            let login = {
                email: 'khevin@mail.com',
                password: '123456'
            }
            chai
                .request(app)
                .post('/users/login')
                .send(login)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('token')
                    expect(res.body).to.have.property('name')
                    expect(res.body).to.have.property('email')
                    done()
                })
        })
        it('should return an object with custom error message when email/password wrong with status code 400', function (done) {
            let login = {
                email: 'khevin12@mail.com',
                password: '1234567'
            }
            chai
                .request(app)
                .post('/users/login')
                .send(login)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal('Wrong Email/Password')
                    done()
                })
        })
    })
})