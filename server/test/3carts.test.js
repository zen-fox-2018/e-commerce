// const chai = require('chai'),
//       chaiHttp = require('chai-http'),
//       { expect } = chai,
//       app = require('../app'),
//       { Cart } = require('../models');

// chai.use(chaiHttp);

// describe('Cart Test', () => {
//   describe('PUT /cart/add SUCCESS', () => {
//     it('Should be return an object with status 201', done => {
//       chai
//         .request(app)
//         .put('/cart/add')
//         .set('token', 'eyJhbGciOiJIUzI1NiJ9.aGVybWFuYm95NTJAZ21haWwuY29t.hj1B7yxKSi7LpOCPn8mxGrFgkuz_WmIzmzRGIcKVcV0')
//         .send({
//           productId: '5c45e43402773a4cc8db3428'
//         })
//         .end((err, res) => {
//           expect(err).to.be.null;
//           expect(res).to.have.status(201);
//           done();
//         })
//     })
//   })

//   describe('PUT /cart/add ERROR', () => {
//     it('Should be return an error with status 400', done => {
//       chai
//         .request(app)
//         .put('/cart/add')
//         .send({
//           productId: '5c45e43402773a4cc8db3428'
//         })
//         .end((err, res) => {
//           expect(err).to.be.null;
//           expect(res).to.have.status(400);
//           done();
//         })
//     })
//     it('Should be return an error with status 400', done => {
//       chai
//         .request(app)
//         .put('/cart/add')
//         .send({
//           productId: '5c45e43402773a4cc8db3aaa'
//         })
//         .end((err, res) => {
//           expect(err).to.be.null;
//           expect(res).to.have.status(400);
//           done();
//         })
//     })
//   })

//   describe('PUT /cart/minus SUCCESS', () => {
//     it('Should be return an object with status 200', done => {
//       chai
//         .request(app)
//         .put('/cart/add')
//         .set('token', 'eyJhbGciOiJIUzI1NiJ9.aGVybWFuYm95NTJAZ21haWwuY29t.hj1B7yxKSi7LpOCPn8mxGrFgkuz_WmIzmzRGIcKVcV0')
//         .send({
//           productId: '5c45e43402773a4cc8db3428'
//         })
//         .end((err, res) => {
//           expect(err).to.be.null;
//           expect(res).to.have.status(200);
//           done();
//         })
//     })
//   })

//   describe('PUT /cart/add ERROR', () => {
//     it('Should be return an error with status 400', done => {
//       chai
//         .request(app)
//         .put('/cart/minus')
//         .send({
//           productId: '5c45e43402773a4cc8db3428'
//         })
//         .end((err, res) => {
//           expect(err).to.be.null;
//           expect(res).to.have.status(400);
//           done();
//         })
//     })
//     it('Should be return an error with status 400', done => {
//       chai
//         .request(app)
//         .put('/cart/minus')
//         .send({
//           productId: '5c45e43402773a4cc8db3aaa'
//         })
//         .end((err, res) => {
//           expect(err).to.be.null;
//           expect(res).to.have.status(400);
//           done();
//         })
//     })
//   })

//   describe('PUT /cart/remove SUCCESS', () => {
//     it('Should be return an object with status 200', done => {
//       chai
//         .request(app)
//         .put('/cart/remove')
//         .set('token', 'eyJhbGciOiJIUzI1NiJ9.aGVybWFuYm95NTJAZ21haWwuY29t.hj1B7yxKSi7LpOCPn8mxGrFgkuz_WmIzmzRGIcKVcV0')
//         .send({
//           productId: '5c45e43402773a4cc8db3428'
//         })
//         .end((err, res) => {
//           expect(err).to.be.null;
//           expect(res).to.have.status(200);
//           done();
//         })
//     })
//   })

//   describe('PUT /cart/add ERROR', () => {
//     it('Should be return an error with status 400', done => {
//       chai
//         .request(app)
//         .put('/cart/minus')
//         .send({
//           productId: '5c45e43402773a4cc8db3428'
//         })
//         .end((err, res) => {
//           expect(err).to.be.null;
//           expect(res).to.have.status(400);
//           done();
//         })
//     })
//     it('Should be return an error with status 400', done => {
//       chai
//         .request(app)
//         .put('/cart/minus')
//         .send({
//           productId: '5c45e43402773a4cc8db3aaa'
//         })
//         .end((err, res) => {
//           expect(err).to.be.null;
//           expect(res).to.have.status(400);
//           done();
//         })
//     })
//   })

//   describe('GET /cart SUCCESS', () => {
//     it('Should be return an object with status 200', done => {
//       chai
//         .request(app)
//         .put('/cart')
//         .set('token', 'eyJhbGciOiJIUzI1NiJ9.aGVybWFuYm95NTJAZ21haWwuY29t.hj1B7yxKSi7LpOCPn8mxGrFgkuz_WmIzmzRGIcKVcV0')
//         .end((err, res) => {
//           expect(err).to.be.null;
//           expect(res).to.have.status(200);
//           done();
//         })
//     })
//   })


// })