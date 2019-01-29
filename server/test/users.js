const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const User = require('../models/user')

chai.use(chaiHttp);

const app = require('../app');
const { request } = chai;

before( async () => {
  try {
    await User.create({
      email: 'tes@mail.com',
      password: '12345',
      role: 'customer'
    });
  } catch (err) {
    console.log(err);
  };
});

after( async () => {
  try {
    await User.deleteMany({});
  } catch (err) {
    console.log(err)
  };
});

describe('/users END POINT TESTING', () => {

  describe('/users POST REGISTER', () => {

    it ('should return object new users with status 201', (done) => {
      let user = {
        email: 'admin@mail.com',
        password: '12345'
      };
      request(app)
        .post('/users')
        .send(user)
        .end( (err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('_id');
          expect(res.body).to.have.property('email');
          expect(res.body).to.have.property('password');
          expect(res.body.email).to.equal(user.email);
          done();
        });    
    });
    it ('should return object error invalid input email with status 500', (done) => {
      let user = {
        email: 'admin',
        password: '12345'
      };
      request(app)
        .post('/users')
        .send(user)
        .end( (err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(500);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('errors');
          done();
        });
    });
    it ('should return object error email cant empty with status 500', (done) => {
      let user = {
        email: '',
        password: '123456'
      }
      request(app)
        .post('/users')
        .send(user)
        .end( (err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(500);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('errors');
          done();
        });
    });
    it ('should return object error password cant empty with status 500', (done) => {
      let user = {
        email: 'admin@mail.com',
        password: ''
      }
      request(app)
        .post('/users')
        .send(user)
        .end( (err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(500);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('errors');
          done();
        })
    });
    it ('should return object error email cant only space with status 500', (done) => {
      let user = {
        email: '       ',
        password: '12345'
      };
      request(app)
        .post('/users')
        .send(user)
        .end( (err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(500);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('errors');
          done();
        });
    });
    it ('should return object error password cant only space with status 500', (done) => {
      let user = {
        email: 'admin@mail.com',
        password: '     '
      };
      request(app)
        .post('/users')
        .send(user)
        .end( (err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(500);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('errors');
          done();
        });
    });
    it ('should return object error email key doesnt exist with status 500', (done) => {
      let user = {
        password: '12345'
      };
      request(app)
        .post('/users')
        .send(user)
        .end( (err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(500);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('errors')
          done();
        });
    });
    it ('should return object error password key doesnt exist with status 500', (done) => {
      let user = {
        email: 'admin@mail.com'
      };
      request(app)
        .post('/users')
        .send(user)
        .end( (err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(500);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('errors');
          done();
        });
    });
    it ('should return object error duplicated email with status 500', (done) => {
      let user = {
        email: 'tes@mail.com',
        password: '12345'
      };
      request(app)
        .post('/users')
        .send(user)
        .end( (err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(500);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('errors');
          done();
        });
    });
    it ('should return object error wrong path endpoint with status 404', (done) => {
      let user = {
        email: 'admin@mail.com',
        password: '12345'
      };
      request(app)
        .post('/us3rs')
        .send(user)
        .end( (err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(404);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('not found')
          done();
        });
    });

  });

  describe('/users/login POST LOGIN', () => {

    it ('should return object with token with status 200', (done) => {
      let user = {
        email: 'tes@mail.com',
        password: '12345'
      };
      request(app)
        .post('/users/login')
        .send(user)
        .end( (err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('token');
          done();
        });
    });
    it ('should return object error wrong email with status 400', (done) => {
      let user = {
        email: 't3s@mail.com',
        password: '12345'
      };
      request(app)
        .post('/users/login')
        .send(user)
        .end( (err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('invalid email / password');
          done();
        });
    });
    it ('should return object error wrong password with status 400', (done) => {
      let user = {
        email: 'tes@mail.com',
        password: '54321'
      };
      request(app)
        .post('/users/login')
        .send(user)
        .end( (err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('invalid email / password');
          done();
        });
    });
    it ('should return object error email key doesnt exist with status 400', (done) => {
      let user = {
        password: '12345'
      };
      request(app)
        .post('/users/login')
        .send(user)
        .end( (err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('email / password cant empty');
          done();
        });
    });
    it ('should return object error password key doesnt exist with status 400', (done) => {
      let user = {
        email: 'tes@mail.com'
      };
      request(app)
        .post('/users/login')
        .send(user)
        .end( (err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('email / password cant empty');
          done();
        })
    });
    it ('should return object error endpoint path not found with status 404', (done) => {
      let user = {
        email: 'tes@mail.com',
        password: '12345'
      };
      request(app)
        .post('/us3rs/log1n')
        .send(user)
        .end( (err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(404);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('not found');
          done();
        });
    });

  });

});