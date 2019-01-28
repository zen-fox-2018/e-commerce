// const chai = require('chai'),
//       chaiHttp = require('chai-http'),
//       { expect } = chai,
//       app = require('../app'),
//       { User, Cart } = require('../models');

// chai.use(chaiHttp);

// describe('Users Test', () => {
//   let newUser = {
//     fullname: 'Herman Yulianto',
//     email: 'hermanboy52@gmail.com',
//     password: 'Sembarang123'
//   }

//   describe('POST /register SUCCESS', () => {
//     it('Should be send an object with status 201', done => {
//       chai
//         .request(app)
//         .post('/register')
//         .send(newUser)
//         .end((err, res) => {
//           expect(err).to.be.null;
//           expect(res).to.have.status(201);
//           expect(res.body).to.be.an('object');
//           expect(res.body).to.have.property('_id');
//           expect(res.body).to.have.property('fullname');
//           expect(res.body).to.have.property('email');
//           expect(res.body).to.have.property('password');
//           expect(res.body).to.include({
//             fullname: newUser.fullname,
//             email: newUser.email  
//           });
//           expect(res.body.password).to.not.equal(newUser.password);
//           done();
//         })
//     })
//   })

//   describe('POST /register FAILED', () => {
    

//     it('Should be send an error with status 400 if Fullname Validation Failed', done => {
//       let failUser = {
//         fullname: 'a',
//         email: 'hermanboy53@gmail.com',
//         password: 'Sembarang123'
//       };
//         chai
//         .request(app)
//         .post('/register')
//         .send(failUser)
//         .end((err, res) => {
//           expect(err).to.be.null;
//           expect(res).to.have.status(400);
//           expect(res.body).to.be.an('object');
//           done();
//         })
//     })

//     it('Should be send an error with status 400 if Email Validation Failed', done => {
//       let failUser = {
//         fullname: 'Herman Yulianto',
//         email: 'hermanboy53gmail.com',
//         password: 'Sembarang123'
//       };
//         chai
//         .request(app)
//         .post('/register')
//         .send(failUser)
//         .end((err, res) => {
//           expect(err).to.be.null;
//           expect(res).to.have.status(400);
//           expect(res.body).to.be.an('object');
//           done();
//         })
//     })

//     it('Should be send an error with status 400 if Password Validation Failed', done => {
//       let failUser = {
//         fullname: 'Herman Yulianto',
//         email: 'hermanboy53@gmail.com',
//         password: '123456'
//       };

//       chai
//         .request(app)
//         .post('/register')
//         .send(failUser)
//         .end((err, res) => {
//           expect(err).to.be.null;
//           expect(res).to.have.status(400);
//           expect(res.body).to.be.an('object');
//           done();
//         })
//     })

//   })

//   describe('POST /login SUCCESS', () => {
//     it('Should be send an object token with status 200', done => {
//       chai
//         .request(app)
//         .post('/login')
//         .send(newUser)
//         .end((err, res) => {
//           token = res.body.token;
//           expect(err).to.be.null;
//           expect(res).to.have.status(200);
//           expect(res.body).to.be.an('object');
//           expect(res.body).to.have.property('token');
//           done();
//         })
//     })
//   })

//   describe('POST /login ERROR', () => {
//     it('Should be send an error with status 400 while username is wrong', done => {
//       let failUser = {
//         email: 'hermanboy53@gmail.com',
//         password: 'Sembarang123'
//       };
//       chai
//         .request(app)
//         .post('/login')
//         .send(failUser)
//         .end((err, res) => {
//           token = res.body.token;
//           expect(err).to.be.null;
//           expect(res).to.have.status(400);
//           expect(res.body).to.be.an('object');
//           done();
//         })
//     })

//     it('Should be send an error with status 400 while password is wrong', done => {
//       let failUser = {
//         email: 'hermanboy52@gmail.com',
//         password: 'Sembarang12'
//       };
//       chai
//         .request(app)
//         .post('/login')
//         .send(failUser)
//         .end((err, res) => {
//           token = res.body.token;
//           expect(err).to.be.null;
//           expect(res).to.have.status(400);
//           expect(res.body).to.be.an('object');
//           done();
//         })
//     })
//   })

//   // after(done => {
//   //   User.deleteMany({})
//   //   .then(response => {
//   //     return Cart.deleteMany({})
//   //   })
//   //   .then(response => {
//   //     done();
//   //   })
//   // })
// })