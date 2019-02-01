const app = require('../app')
const chai = require('chai')
const { clearDBProduct } = require('../helpers/index.test')
const chaiHttp = require('chai-http')
const { expect } = require('chai')

chai.use(chaiHttp)

after(function (done) {
    clearDBProduct(done)
})

let product = {}
let productId = ''

describe('TESTING FOR PRODUCT', function () {
    describe('Create new product', function () {
        it('should return new object with status code 201', function (done) {
            let newProduct = {
                name: 'Fossil Twin Leather',
                description: 'Lorem Ipsum Lorem Ipsum Lorem Ipsum',
                stock: 10,
                price: 1000000,
            }
            product = newProduct
            chai
                .request(app)
                .post('/products/product')
                .send(newProduct)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(201)
                    expect(res).to.be.an('object')
                    expect(res.body).to.have.property('name')
                    expect(res.body).to.have.property('description')
                    expect(res.body).to.have.property('stock')
                    expect(res.body).to.have.property('price')
                    productId = res.body._id
                    done()
                })
        })
        it('should return with custom message validation type string when property name is empty with status code 400', function (done) {
            let newProduct = {
                name: '',
                description: 'Lorem Ipsum Lorem Ipsum Lorem Ipsum',
                stock: 10,
                price: 1000000
            }
            chai
                .request(app)
                .post('/products/product')
                .send(newProduct)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('string')
                    expect(res.body).to.equal('Product name must be filled!')
                    done()
                })
        })
        it('should return with custom message validation type string when property description is empty with status code 400', function (done) {
            let newProduct = {
                name: 'Fossil Twin Leather',
                description: '',
                stock: 10,
                price: 1000000
            }
            chai
                .request(app)
                .post('/products/product')
                .send(newProduct)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('string')
                    expect(res.body).to.equal('Product description must be filled!')
                    done()
                })
        })
        it('should return a new object when not filling stock property with status code 201', function (done) {
            let newProduct = {
                name: 'Fossil Twin Leather',
                description: 'Lorem Ipsum Lorem Ipsum Lorem Ipsum',
                price: 1000000
            }
            chai
                .request(app)
                .post('/products/product')
                .send(newProduct)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(201)
                    expect(res.body).to.be.an('object')
                    expect(res.body.stock).to.equal(0)
                    done()
                })
        })
        it('should return with custom message validation type string when property price less than 1 with status code 400', function(done) {
            let newProduct = {
                name: 'Fossil Twin Leather',
                description: 'Lorem Ipsum Lorem Ipsum Lorem Ipsum',
                stock: 10,
                price: 0
            }
            chai
                .request(app)
                .post('/products/product')
                .send(newProduct)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('string')
                    expect(res.body).to.equal('Price cannot be null')
                    done()
                })
        }) 
    })
    describe('Find all products', function () {
        it('should return an array of objects with status code 200', function (done) {
            chai
                .request(app)
                .get('/products')
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('array')
                    expect(res.body).to.have.lengthOf(3)
                    expect(res.body[0]).to.have.property('_id')
                    expect(res.body[0]).to.have.property('name')
                    expect(res.body[0]).to.have.property('description')
                    expect(res.body[0]).to.have.property('stock')
                    expect(res.body[0]).to.have.property('price')
                    expect(res.body[0]).to.deep.include(product)
                    done()
                })
        })
    })
    describe('Find one product', function () {
        it('should return object with status code 200', function (done) {
            chai
                .request(app)
                .get(`/products/${productId}`)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('name')
                    expect(res.body).to.have.property('description')
                    expect(res.body).to.have.property('stock')
                    expect(res.body).to.have.property('price')
                    done()
                })
        })
        it('should return object error message with status code 500 if product objectId not valid', function (done) {
            chai
                .request(app)
                .get(`/products/123123`)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(500)
                    expect(res.body).to.have.property('message')
                    expect(res.body.message).to.equal('Cast to ObjectId failed for value "123123" at path "_id" for model "Product"')
                    done()
                })
        })
        it('should return object error message with status code 404 if product id not found', function(done) {
            chai
                .request(app)
                .get('/products/5c4599c1a8ed8e45e5ca0c63')
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(404)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal('Product not found')
                    done()
                })
        })
    })
    describe('Update product', function () {
        it('should return object with status code 200', function (done) {
            let editProduct = {
                name: 'Fossil',
                description: 'Lorem Ipsum',
                stock: 10,
                price: 2000000
            }
            chai
                .request(app)
                .put(`/products/${productId}`)
                .send(editProduct)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    done()
                })
        })
        it('should return object error message with status code 404 if product id not found', function (done) {
            let editProduct = {
                name: 'Fossil',
                description: 'Lorem Ipsum',
                stock: 10,
                price: 2000000
            }
            chai
                .request(app)
                .put(`/products/5c4599c1a8ed8e45e5ca0c63`)
                .send(editProduct)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(404)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal('Product not found')
                   done()
                })
        })
        it('should return with custom message validation type string when property name is empty with status code 400', function (done) {
            let newProduct = {
                name: '',
                description: 'Lorem Ipsum Lorem Ipsum Lorem Ipsum',
                stock: 10,
                price: 1000000
            }
            chai
                .request(app)
                .put(`/products/${productId}`)
                .send(newProduct)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('string')
                    expect(res.body).to.equal('Product name must be filled!')
                    done()
                })
        })
        it('should return with custom message validation type string when property description is empty with status code 400', function (done) {
            let newProduct = {
                name: 'Fossil Twin Leather',
                description: '',
                stock: 10,
                price: 1000000
            }
            chai
                .request(app)
                .put(`/products/${productId}`)
                .send(newProduct)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('string')
                    expect(res.body).to.equal('Product description must be filled!')
                    done()
                })
        })
        it('should return with custom message validation type string when property price less than 1 with status code 400', function(done) {
            let newProduct = {
                name: 'Fossil Twin Leather',
                description: 'Lorem Ipsum Lorem Ipsum Lorem Ipsum',
                stock: 10,
                price: 0
            }
            chai
                .request(app)
                .put(`/products/${productId}`)
                .send(newProduct)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('string')
                    expect(res.body).to.equal('Price cannot be null')
                    done()
                })
        }) 
    })
    describe('Delete product', function () {
        it('should send a string when successfully deleting product with status code 200', function (done) {
            chai
                .request(app)
                .delete(`/products/${productId}`)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    expect(res.body.msg).to.be.an('string')
                    expect(res.body.msg).to.equal('Successfully deleted this product')
                    done()
                })
        })
        it('should send a string when product id is not valid with status code 500', function (done) {
            chai
                .request(app)
                .delete(`/products/123123`)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(500)
                    expect(res.body).to.be.an('object')
                    expect(res.body.message).to.be.an('string')
                    expect(res.body.message).to.equal('Cast to ObjectId failed for value "123123" at path "_id" for model "Product"')
                    done()
                })
        })
        it('should send a string when product id is not found with status code 404', function (done) {
            chai
                .request(app)
                .delete(`/products/5c4599c1a8ed8e45e5ca0c63`)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(404)
                    expect(res.body).to.be.an('object')
                    expect(res.body.msg).to.be.an('string')
                    expect(res.body.msg).to.equal('Product not found')
                    done()
                })
        })
    })
    
})
