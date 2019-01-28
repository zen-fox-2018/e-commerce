const chai = require('chai'),
      chaiHttp = require('chai-http'),
      { expect } = chai,
      app = require('../app'),
      { User, Cart, Product } = require('../models');

let token = '';
let productId = '';

chai.use(chaiHttp);

after(done => {
  User.deleteMany({})
  .then(response => {
    return Cart.deleteMany({})
  })
  .then(response => {
    return Product.deleteMany({})
  })
  .then(response => {
    done()
  })
})


describe('Users Test', () => {
  let newUser = {
    fullname: 'Herman Yulianto',
    email: 'hermanboy52@gmail.com',
    password: 'Sembarang123'
  }

  describe('POST /register SUCCESS', () => {
    it('Should be send an object with status 201', done => {
      chai
        .request(app)
        .post('/register')
        .send(newUser)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('_id');
          expect(res.body).to.have.property('fullname');
          expect(res.body).to.have.property('email');
          expect(res.body).to.have.property('password');
          expect(res.body).to.include({
            fullname: newUser.fullname,
            email: newUser.email  
          });
          expect(res.body.password).to.not.equal(newUser.password);
          done();
        })
    })
  })

  describe('POST /register FAILED', () => {
    

    it('Should be send an error with status 400 if Fullname Validation Failed', done => {
      let failUser = {
        fullname: 'a',
        email: 'hermanboy53@gmail.com',
        password: 'Sembarang123'
      };
        chai
        .request(app)
        .post('/register')
        .send(failUser)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          done();
        })
    })

    it('Should be send an error with status 400 if Email Validation Failed', done => {
      let failUser = {
        fullname: 'Herman Yulianto',
        email: 'hermanboy53gmail.com',
        password: 'Sembarang123'
      };
        chai
        .request(app)
        .post('/register')
        .send(failUser)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          done();
        })
    })

    it('Should be send an error with status 400 if Password Validation Failed', done => {
      let failUser = {
        fullname: 'Herman Yulianto',
        email: 'hermanboy53@gmail.com',
        password: '123456'
      };

      chai
        .request(app)
        .post('/register')
        .send(failUser)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          done();
        })
    })

  })

  describe('POST /login SUCCESS', () => {
    it('Should be send an object token with status 200', done => {
      chai
        .request(app)
        .post('/login')
        .send(newUser)
        .end((err, res) => {
          token = res.body.token;
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('token');
          done();
        })
    })
  })

  describe('POST /login ERROR', () => {
    it('Should be send an error with status 400 while username is wrong', done => {
      let failUser = {
        email: 'hermanboy53@gmail.com',
        password: 'Sembarang123'
      };
      chai
        .request(app)
        .post('/login')
        .send(failUser)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          done();
        })
    })

    it('Should be send an error with status 400 while password is wrong', done => {
      let failUser = {
        email: 'hermanboy52@gmail.com',
        password: 'Sembarang12'
      };
      chai
        .request(app)
        .post('/login')
        .send(failUser)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          done();
        })
    })
  })
})

describe('Products Test', () => {
  let id = '';
  describe('POST /products SUCCESS', () => {
    it('Should send an object with status 201', done => {
      let newProduct = {
        name: 'Laptop',
        price: 1000000
      };
      chai
        .request(app)
        .post('/products')
        .send(newProduct)
        .end((err, res) => {
          id = res.body._id;
          expect(err).to.be.null;
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('_id');
          expect(res.body).to.have.property('name');
          expect(res.body).to.have.property('price');
          expect(res.body).to.have.property('stock');
          expect(res.body.name).to.equal(newProduct.name);
          expect(res.body.price).to.equal(newProduct.price);
          expect(res.body.stock).to.equal(0);
          done();
        })
      })
  })

  describe('POST /products ERROR', () => {
    it('Should send an error with status 400 while name is empty', done => {
      let failProduct = {
        name: '',
        price: 1000000
      };
      chai
        .request(app)
        .post('/products')
        .send(failProduct)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          done();
        })
      })

      it('Should send an error with status 400 while price less then 1', done => {
        let failProduct = {
          name: 'Laptop',
          price: 0
        };
        chai
          .request(app)
          .post('/products')
          .send(failProduct)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(400);
            expect(res.body).to.be.an('object');
            done();
          })
        })
  
  })

  describe('GET /products', () => {
    it('Should be send arrays of object with status 200', done => {
      chai
        .request(app)
        .get('/products')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        })
    })
  })

  describe(`PUT /products/:id SUCCESS`, () => {
    it('Should be updated a product with status 200', done => {
      let updateProduct = {
        name: 'Laptop Asus',
        price: 500000,
        stock: 5
      }
      chai
        .request(app)
        .put(`/products/${productId}`)
        .send(updateProduct)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('_id');
          expect(res.body).to.have.property('name');
          expect(res.body).to.have.property('price');
          expect(res.body).to.have.property('stock');
          done();
        })
    })
  })

  describe(`PUT /products/:id ERROR`, () => {
    it('Should be return an error with status 400 while products not found', done => {
      let failProduct = {
        name: 'Laptop',
        price: 500000,
        stock: 5
      }
      chai
        .request(app)
        .put(`/products/5c45bfad457c7360180bac43`)
        .send(failProduct)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          done();
        })
    })

    it('Should be return an error with status 400 while name is empty', done => {
      let failProduct = {
        name: '',
        price: 500000,
        stock: 5
      }
      chai
        .request(app)
        .put(`/products/${productId}`)
        .send(failProduct)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          done();
        })
    })

    it('Should be return an error with status 400 while price less than 1', done => {
      let failProduct = {
        name: 'Laptop',
        price: 0,
        stock: 5
      }
      chai
        .request(app)
        .put(`/products/${productId}`)
        .send(failProduct)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          done();
        })
    })

    it('Should be return an error with status 400 while stock less than 0', done => {
      let failProduct = {
        name: 'Laptop',
        price: 1000,
        stock: -1
      }
      chai
        .request(app)
        .put(`/products/${productId}`)
        .send(failProduct)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          done();
        })
    })
  })

  describe('DELETE /products/:id ERROR', () => {
    it('Should be return an error with status 400 when product not found', done => {
      chai
        .request(app)
        .delete(`/products/$5c45bfad457c7360180bac43`)
        .end((err, res) => {
          console.log(err);
          
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          done();
        })
    })
  })


  describe('DELETE /products/:id SUCCESS', () => {
    it('Should be deleted a product with status 200', done => {
      chai
        .request(app)
        .delete(`/products/${productId}`)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          done();
        })
    })
  })
})

describe('Cart Test', () => {
  describe('PUT /cart/add SUCCESS', () => {
    it('Should be return an object with status 201', done => {
      chai
        .request(app)
        .put('/cart/add')
        .set('token', token)
        .send({
          productId: productId
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(201);
          done();
        })
    })
  })

  describe('PUT /cart/add ERROR', () => {
    it('Should be return an error with status 400', done => {
      chai
        .request(app)
        .put('/cart/add')
        .send({
          productId: productId
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          done();
        })
    })
    it('Should be return an error with status 400', done => {
      chai
        .request(app)
        .put('/cart/add')
        .set('token', token)
        .send({
          productId: '5c45e43402773a4cc8db3aaa'
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          done();
        })
    })
  })

  describe('PUT /cart/minus SUCCESS', () => {
    it('Should be return an object with status 200', done => {
      chai
        .request(app)
        .put('/cart/add')
        .set('token', token)
        .send({
          productId: '5c45e43402773a4cc8db3428'
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        })
    })
  })

  describe('PUT /cart/add ERROR', () => {
    it('Should be return an error with status 400', done => {
      chai
        .request(app)
        .put('/cart/minus')
        .send({
          productId: '5c45e43402773a4cc8db3428'
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          done();
        })
    })
    it('Should be return an error with status 400', done => {
      chai
        .request(app)
        .put('/cart/minus')
        .set('token', token)
        .send({
          productId: '5c45e43402773a4cc8db3aaa'
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          done();
        })
    })
  })

  describe('PUT /cart/remove SUCCESS', () => {
    it('Should be return an object with status 200', done => {
      chai
        .request(app)
        .put('/cart/remove')
        .set('token', token)
        .send({
          productId: productId
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        })
    })
  })

  describe('PUT /cart/add ERROR', () => {
    it('Should be return an error with status 400', done => {
      chai
        .request(app)
        .put('/cart/minus')
        .send({
          productId: '5c45e43402773a4cc8db3428'
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          done();
        })
    })
    it('Should be return an error with status 400', done => {
      chai
        .request(app)
        .put('/cart/minus')
        .set('token', token)
        .send({
          productId: '5c45e43402773a4cc8db3aaa'
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          done();
        })
    })
  })

  describe('GET /cart SUCCESS', () => {
    it('Should be return an object with status 200', done => {
      chai
        .request(app)
        .put('/cart')
        .set('token', token)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        })
    })
  })
})
