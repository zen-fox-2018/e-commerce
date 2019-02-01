const chai = require('chai');
const chaiHttp  = require('chai-http');
const jwt = require('jsonwebtoken');
const expect = chai.expect;
const app = require('../app');
const User = require('../models/User');
chai.use(chaiHttp);


describe('Users Authentication Test', function() {
    describe('POST/Sign Up', function() {
        before(function(done) {
            User.deleteMany({})
            .then(() => {
              done();
              console.log('masuk post sign up');
            })
            .catch((err) => {
                console.log(err);
            })
        })
        it('should send status code of 200 and object of new user', function(done) {
            const user = { name: 'sarah', email: 'sarah@gmail.com', password: 'sarah123' }
            chai
                .request(app)
                .post('/users/signup')
                .send(user)
                .end(function(err, res) {
                  expect(err).to.be.null;
                  expect(res).to.have.status(200);
                  expect(res.body).to.be.an('object');
                  expect(res.body).to.have.property('_id');
                  expect(res.body).to.have.property('email');
                  expect(res.body).to.have.property('password');
                  expect(res.body.password).to.not.equal(user.password);
                  done();
                })
        })
        it('should send status code of 400 if email duplicated', function(done) {
            const user = { name:'sarah', email:'sarah@gmail.com', password:'sarah123' }
            chai
                .request(app)
                .post('/users/signup')
                .send(user)
                .end(function(err, res) {
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('err');
                    expect(res.body.err).to.equal('User validation failed: email: User Already Exist')
                    done();
                })
        })
        it('should send status code of 400 if email format is wrong', function(done) {
            const user = { name: 'sarah', email:'sarah@gmail', password: 'sarah123'}
            chai
                .request(app)
                .post('/users/signup')
                .send(user)
                .end(function(err, res) {
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('err');
                    expect(res.body.err).to.equal('User validation failed: email: Please fill a valid email address');
                    done();
                })
        }),
        it('should send status code of 400 if name is empty string', function(done) {
            const user = { name:'', email:'karina@gmail.com', password: 'karina123'}
            chai
                .request(app)
                .post('/users/signup')
                .send(user)
                .end(function(err, res) {
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('err');
                    expect(res.body.err).to.equal('User validation failed: name: Name is Required');
                    done();
                })
        })
        it('should send status code of 400 if email is empty string', function(done) {
            const user = { name: 'sarah', email: '',password: 'sarah123'}
            chai
                .request(app)
                .post('/users/signup')
                .send(user)
                .end(function(err, res) {
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('err');
                    expect(res.body.err).to.equal('User validation failed: email: Email Address is Required');
                    done();
                })
        }) 
        it('should send status code of 400 if name key is not provided', function(done) {
            const user = { name:'', email:'karina@gmail.com', password: 'karina123'}
            chai
                .request(app)
                .post('/users/signup')
                .send(user)
                .end(function(err, res) {
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('err');
                    expect(res.body.err).to.equal('User validation failed: name: Name is Required');
                    done();
                })
        })
        it('should send status code of 400 if email key is not provided', function(done) {
            const user = { name: 'sarah', password: 'sarah123' };
            chai
                .request(app)
                .post('/users/signup')
                .send(user)
                .end(function(err, res) {
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('err');
                    expect(res.body.err).to.equal('User validation failed: email: Email Address is Required');
                    done();
                })
        })
        it('should send status code of 500 if password key is not provided', function(done) {
            const user = { name: 'sarah', email: 'sarah@gmail.com' };
            chai
                .request(app)
                .post('/users/signup')
                .send(user)
                .end(function(err, res) {
                    expect(res).to.have.status(500);
                    done();
                })
         
        })
    })
    describe('POST/Sign In', function() {
        after(function(done) {
            User.deleteMany({})
            .then(() => {
                done();
                console.log('masuk post sign in')
            })
            .catch((err) => {
              console.log(err);
            })
        })
        it('should send status code of 200 and return jwt object token', function(done) {
            const user = { email: 'sarah@gmail.com', password: 'sarah123' }
            chai
                .request(app)
                .post('/users/signin')
                .send(user)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('token');
                    const decoded = jwt.decode(res.body.token)
                    expect(decoded).to.have.property('email')
                    expect(decoded.email).to.equal(user.email)
                    done();
                })
        })
        it('should send status code of 400 if email does not exist', function(done) {
            let user = { email: 'somethingwrong@gmail.com', password: 'sarah123' }
            chai
                .request(app)
                .post('/users/signin')
                .send(user)
                .end(function(err, res) {
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('message');
                    expect(res.body.message).to.equal = 'User Not Found';
                    done();
                })
        })
        it('should send status code of 400 if password is wrong', function(done) {
            const user = { email: 'sarah@gmail.com', password: 'wrong password' }
            chai
                .request(app)
                .post('/users/signin')
                .send(user)
                .end(function(err, res) {
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('message');
                    expect(res.body.message).to.equal = 'Wrong Password';
                    done();
                })
        })
    })
})
