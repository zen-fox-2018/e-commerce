const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app')
const clearProduct = require('../helpers/clearProduct')

chai.use(chaiHttp)

before(function(done) {
    clearProduct(done)
})

after(function(done) {
    clearProduct(done)
})

describe('products test', function() {

    describe('GET /products', function() {
        it('should send an array with 200 status code', function(done) {
            chai
                .request(app)
                .get('/products')
                .end(function(err, res) {
                    // console.log(res.body);
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('array')
                    done()
                })
        })
    })

    let productId = ''
    describe('POST /products', function() {
        it('should send an object with 201 status code', function(done) {
            const newProduct = {
                name: 'product',
                price: 1000,
                stock: 10
            }
            let data = {data: JSON.stringify(newProduct)}
            chai
                .request(app)
                .post('/products')
                .send(data)
                .end(function(err, res) {
                    // console.log(res.body);
                    expect(err).to.be.null
                    expect(res).to.have.status(201)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('_id')
                    expect(res.body).to.have.property('name')
                    expect(res.body).to.have.property('price')
                    expect(res.body).to.have.property('stock')
                    expect(res.body).to.have.property('createdAt')
                    expect(res.body.name).to.equal(newProduct.name)
                    expect(res.body.price).to.equal(newProduct.price)
                    expect(res.body.stock).to.equal(newProduct.stock)

                    productId = res.body._id
                    done()
                })
        })

        it('should send an object with 400 status code and message name required', function(done) {
            const newProduct = {
                name: '',
                price: 1000,
                stock: 10
            }
            let data = {data: JSON.stringify(newProduct)}
            chai
                .request(app)
                .post('/products')
                .send(data)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('errors')
                    expect(res.body.errors.name.message).to.equal('name required')
                    done()
                })
        })

        it('should send an object with 400 status code and message price required', function(done) {
            const newProduct = {
                name: 'product',
                stock: 10
            }
            let data = {data: JSON.stringify(newProduct)}
            chai
                .request(app)
                .post('/products')
                .send(data)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('errors')
                    expect(res.body.errors.price.message).to.equal('price required')
                    done()
                })
        })

        it('should send an object with 400 status code and message stock required', function(done) {
            const newProduct = {
                name: 'product',
                price: 1000,
            }
            let data = {data: JSON.stringify(newProduct)}
            chai
                .request(app)
                .post('/products')
                .send(data)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('errors')
                    expect(res.body.errors.stock.message).to.equal('stock required')
                    done()
                })
        })
    })

    describe('PUT /products/:id', function() {
        it('should send an object with 200 status code', function(done) {
            const newProduct = {
                name: 'product',
                price: 1000,
                stock: 10
            }
            let data = {data: JSON.stringify(newProduct)}
            chai
                .request(app)
                .put(`/products/${productId}`)
                .send(data)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('_id')
                    expect(res.body).to.have.property('name')
                    expect(res.body).to.have.property('price')
                    expect(res.body).to.have.property('stock')
                    expect(res.body).to.have.property('createdAt')
                    expect(res.body.name).to.equal(newProduct.name)
                    expect(res.body.price).to.equal(newProduct.price)
                    expect(res.body.stock).to.equal(newProduct.stock)
                    done()
                })
        })

        it('should send an object with 404 status code', function(done) {
            chai
                .request(app)
                .delete('/products')
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(404);
                    expect(res.body).to.be.an('object')
                    done()
                })
            })
    })

    describe('DELETE /products/:id', function() {
        it('should send an object with 200 status code', function(done) {
            chai
                .request(app)
                .delete(`/products/${productId}`)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    done()
                })
        })

        it('should send an object with 404 status code', function(done) {
            chai
                .request(app)
                .delete('/products')
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(404);
                    expect(res.body).to.be.an('object')
                    done()
                })
        })
    })
})