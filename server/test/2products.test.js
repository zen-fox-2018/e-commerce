// const chai = require('chai'),
//       chaiHttp = require('chai-http'),
//       { expect } = chai,
//       app = require('../app'),
//       { Product } = require('../models');

// chai.use(chaiHttp);

// describe('Products Test', () => {
//   let id = '';
//   describe('POST /products SUCCESS', () => {
//     it('Should send an object with status 201', done => {
//       let newProduct = {
//         name: 'Laptop',
//         price: 1000000
//       };
//       chai
//         .request(app)
//         .post('/products')
//         .send(newProduct)
//         .end((err, res) => {
//           id = res.body._id;
//           expect(err).to.be.null;
//           expect(res).to.have.status(201);
//           expect(res.body).to.be.an('object');
//           expect(res.body).to.have.property('_id');
//           expect(res.body).to.have.property('name');
//           expect(res.body).to.have.property('price');
//           expect(res.body).to.have.property('stock');
//           expect(res.body.name).to.equal(newProduct.name);
//           expect(res.body.price).to.equal(newProduct.price);
//           expect(res.body.stock).to.equal(0);
//           done();
//         })
//       })
//   })

//   describe('POST /products ERROR', () => {
//     it('Should send an error with status 400 while name is empty', done => {
//       let failProduct = {
//         name: '',
//         price: 1000000
//       };
//       chai
//         .request(app)
//         .post('/products')
//         .send(failProduct)
//         .end((err, res) => {
//           expect(err).to.be.null;
//           expect(res).to.have.status(400);
//           expect(res.body).to.be.an('object');
//           done();
//         })
//       })

//       it('Should send an error with status 400 while price less then 1', done => {
//         let failProduct = {
//           name: 'Laptop',
//           price: 0
//         };
//         chai
//           .request(app)
//           .post('/products')
//           .send(failProduct)
//           .end((err, res) => {
//             expect(err).to.be.null;
//             expect(res).to.have.status(400);
//             expect(res.body).to.be.an('object');
//             done();
//           })
//         })
  
//   })

//   describe('GET /products', () => {
//     it('Should be send arrays of object with status 200', done => {
//       chai
//         .request(app)
//         .get('/products')
//         .end((err, res) => {
//           expect(err).to.be.null;
//           expect(res).to.have.status(200);
//           expect(res.body).to.be.an('array');
//           done();
//         })
//     })
//   })

//   describe(`PUT /products/:id SUCCESS`, () => {
//     it('Should be updated a product with status 200', done => {
//       let updateProduct = {
//         name: 'Laptop Asus',
//         price: 500000,
//         stock: 5
//       }
//       chai
//         .request(app)
//         .put(`/products/${id}`)
//         .send(updateProduct)
//         .end((err, res) => {
//           expect(err).to.be.null;
//           expect(res).to.have.status(200);
//           expect(res.body).to.be.an('object');
//           expect(res.body).to.have.property('_id');
//           expect(res.body).to.have.property('name');
//           expect(res.body).to.have.property('price');
//           expect(res.body).to.have.property('stock');
//           done();
//         })
//     })
//   })

//   describe(`PUT /products/:id ERROR`, () => {
//     it('Should be return an error with status 400 while products not found', done => {
//       let failProduct = {
//         name: 'Laptop',
//         price: 500000,
//         stock: 5
//       }
//       chai
//         .request(app)
//         .put(`/products/5c45bfad457c7360180bac43`)
//         .send(failProduct)
//         .end((err, res) => {
//           expect(err).to.be.null;
//           expect(res).to.have.status(400);
//           expect(res.body).to.be.an('object');
//           done();
//         })
//     })

//     it('Should be return an error with status 400 while name is empty', done => {
//       let failProduct = {
//         name: '',
//         price: 500000,
//         stock: 5
//       }
//       chai
//         .request(app)
//         .put(`/products/${id}`)
//         .send(failProduct)
//         .end((err, res) => {
//           expect(err).to.be.null;
//           expect(res).to.have.status(400);
//           expect(res.body).to.be.an('object');
//           done();
//         })
//     })

//     it('Should be return an error with status 400 while price less than 1', done => {
//       let failProduct = {
//         name: 'Laptop',
//         price: 0,
//         stock: 5
//       }
//       chai
//         .request(app)
//         .put(`/products/${id}`)
//         .send(failProduct)
//         .end((err, res) => {
//           expect(err).to.be.null;
//           expect(res).to.have.status(400);
//           expect(res.body).to.be.an('object');
//           done();
//         })
//     })

//     it('Should be return an error with status 400 while stock less than 0', done => {
//       let failProduct = {
//         name: 'Laptop',
//         price: 1000,
//         stock: -1
//       }
//       chai
//         .request(app)
//         .put(`/products/${id}`)
//         .send(failProduct)
//         .end((err, res) => {
//           expect(err).to.be.null;
//           expect(res).to.have.status(400);
//           expect(res.body).to.be.an('object');
//           done();
//         })
//     })
//   })

//   describe('DELETE /products/:id ERROR', () => {
//     it('Should be return an error with status 400 when product not found', done => {
//       chai
//         .request(app)
//         .delete(`/products/$5c45bfad457c7360180bac43`)
//         .end((err, res) => {
//           console.log(err);
          
//           expect(err).to.be.null;
//           expect(res).to.have.status(400);
//           expect(res.body).to.be.an('object');
//           done();
//         })
//     })
//   })


//   describe('DELETE /products/:id SUCCESS', () => {
//     it('Should be deleted a product with status 200', done => {
//       chai
//         .request(app)
//         .delete(`/products/${id}`)
//         .end((err, res) => {
//           expect(err).to.be.null;
//           expect(res).to.have.status(200);
//           expect(res.body).to.be.an('object');
//           done();
//         })
//     })
//   })

//   // after(done => {
//   //   Product.deleteMany({})
//   //     .then(response => {
//   //       done();
//   //     })
//   // })
// })