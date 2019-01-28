const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app')
const clearUser = require('../helpers/clearUser')

chai.use(chaiHttp)

before(function(done) {
    clearUser(done)
})

after(function(done) {
    clearUser(done)
})

describe('user test', function() {

    describe('POST /users/register', function() {
        it('should send an object with 201 status code', function(done) {
            const newUser = {
                name: "fauzan",
                email: "fauzan@mail.com",
                password: "fauzan"
            }
            chai
                .request(app)
                .post('/users/register')
                .send(newUser)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('_id')
                    expect(res.body).to.have.property('name')
                    expect(res.body).to.have.property('email')
                    expect(res.body.name).to.equal(newUser.name)
                    expect(res.body.email).to.equal(newUser.email)
                    user = res.body
                    done()
                })
        })

        it('should send an object with 400 status code and message name is required', function(done) {
            const newUser = {
                name: "",
                email: "fauzan@mail.com",
                password: "fauzan"
            }
            chai
                .request(app)
                .post('/users/register')
                .send(newUser)
                .end(function(err, res) {
                    // console.log(res.body);
                    // console.log(res.body.errors.name.message);
                    expect(err).to.be.null;
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('errors')
                    expect(res.body.errors.name.message).to.equal('name is required')
                    done()
                })
        })

        it('should send an object with 400 status code and message email is required', function(done) {
            const newUser = {
                name: "fauzan",
                email: "",
                password: "fauzan"
            }
            chai
                .request(app)
                .post('/users/register')
                .send(newUser)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('errors')
                    expect(res.body.errors.email.message).to.equal('email is required')
                    done()
                })
        })

        it('should send an object with 400 status code and message password is required', function(done) {
            const newUser = {
                name: "fauzan",
                email: "fauzan@mail.com",
                password: ""
            }
            chai
                .request(app)
                .post('/users/register')
                .send(newUser)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('errors')
                    expect(res.body.errors.password.message).to.equal('password is required')
                    done()
                })
        })

        it('should send an object with 400 status code and message invalid email format', function(done) {
            const newUser = {
                name: "fauzan",
                email: "fauzanmailcom",
                password: "fauzan"
            }
            chai
                .request(app)
                .post('/users/register')
                .send(newUser)
                .end(function(err, res) {
                    // console.log(res.body);
                    // console.log(res.body.errors);
                    expect(err).to.be.null;
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('errors')
                    expect(res.body.errors.email.message).to.equal('invalid email format')
                    done()
                })
        })

        it('should send an object with 400 status code and message email already used', function(done) {
            const newUser = {
                name: "fauzan",
                email: "fauzan@mail.com",
                password: "fauzan"
            }
            chai
                .request(app)
                .post('/users/register')
                .send(newUser)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('errors')
                    expect(res.body.errors.email.message).to.equal('email already used')
                    done()
                })
        })
    })

    describe('POST /users/login', function() {
        it('should send an object with 200 status code', function(done) {
            const input = {
                email: "fauzan@mail.com",
                password: "fauzan"
            }
            chai
                .request(app)
                .post('/users/login')
                .send(input)
                .end(function(err, res) {
                    // console.log(res.body);
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('token')
                    done()
                })
        })

        it('should send an object with 400 status code and message email / password wrong', function(done) {
            const input = {
                email: "",
                password: "fauzan"
            }
            chai
                .request(app)
                .post('/users/login')
                .send(input)
                .end(function(err, res) {
                    // console.log(res.body);
                    expect(err).to.be.null;
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal('email / password wrong')
                    done()
                })
        })

        it('should send an object with 400 status code and message email / password wrong', function(done) {
            const input = {
                email: "fauzan@mail.com",
                password: ""
            }
            chai
                .request(app)
                .post('/users/login')
                .send(input)
                .end(function(err, res) {
                    // console.log(res.body);
                    expect(err).to.be.null;
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal('email / password wrong')
                    done()
                })
        })
    })
})
