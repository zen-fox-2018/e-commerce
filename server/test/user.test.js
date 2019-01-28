const chai        = require('chai'),
      chaiHttp    = require('chai-http'),
      expect      = chai.expect,
      app         = require('../app');
      Model       = require('../models/user');
      JWT_SECRET  = process.env.JWT_SECRET;
      
chai.use(chaiHttp);
var userData = {
  email: 'tester@mail.com',
  password: 'A12345',
  firstName: 'theo',
  lastName: 'darmawan'
}
var clearUser = function () {
  Model.findOneAndDelete(userData)
  .then(() => {
    console.log('cleared user collection...');
  })
}
describe('User Tests', function () {
  afterEach('clear user data',clearUser);
  describe('POST /signup', function () {
    it('should send a user object with 200 status code', function (done) {
      chai
        .request(app)
        .post('/users/signup')
        .send(userData)
        .end(function (err,res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.be.a('string');
          expect(res.body).to.have.property('token');
          done();        
        })
    });
    it('should send an error message with 400 status code on invalid email format', function (done) {
      let failUser = userData;
      failUser.email = "this-will-fail-regex-validation";
      chai  
        .request(app)
        .post('/users/signup')
        .send(failuser)
        .end(function(err,res) {
          expect(err);
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('Error');
          done();
        })
    });
  
  })
  describe('POST /signin', function () {
    const signInData = userData;
    delete signInData.firstName,
           signInData.lastName;
    const failData = {
      email: 'xxx',
      password: 'fail'
    }
    it('should send a user object with 200 status code', function (done) {
      chai
        .request(app)
        .post('/users/signin')
        .send(signInData)
        .end(function (err,res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.be.a('string');
          expect(res.body).to.have.property('token');
          expect(jwt.verify(res.body.token, JWT_SECRET).email).to.equal(signInData.email);
          done();        
        })
    });  
    it('should fail with 400 status code on wrong password / username', function (done) {
      chai
        .request(app)
        .post('/users/signup')
        .send(failData)
        .end(function (err,res) {
          expect(err).to.exist();
          expect(res.body.token).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('error');
          done();        
        })
    });     
  })
  //THIS DOESNT WORK YET NEED TO GET ACCESS TOKEN
  describe('POST /gsignin', function () {
    it('should return a res object with token and status code 200 on google sign in', function (done) {
      // NEED TO GET G ACCESS TOKEN
      chai
      .request(app)
      .post('/user/gsignin')
      .send({
        headers: {
          accessToken
        }
      })
      .end(function (err,res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('token');
        expect(jwt.verify(res.body.token, JWT_SECRET).email).to.equal(accessToken.email);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('successfully signed in with google.');
        done();
      })
      
    })  
    it('should fail with status code 400 on invalid access-token', function (err,res) {
      chai
      .request(app)
      .post('/user/gsignin')
      .send({
        headers: {
          accessToken: 'invalid'
        }
      })
      .end(function (err,res) {
        console.log(err)
        expect(err).to.exist;
        expect(err).to.equal('invalid access-token');
        expect(res).to.have.status(400);
        done();
      })
    })  
  })
  
})