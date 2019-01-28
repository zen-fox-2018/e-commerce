const app = require('../app')
const chai = require('chai')
const { clearDBCart, clearDBUser } = require('../helpers/index.test')
const chaiHttp = require('chai-http')
const { expect } = require('chai')

chai.use(chaiHttp)

after(function(done) {
    clearDBCart(done)
})


let token = ''
let productId = ''
let userId = ''

describe('TESTING FOR CART', function () {
    describe('Add to carts', function () {
        it('should return a object of new user with status code 201', function (done) {
            let newUser = {
                name: 'khevin',
                email: 'khevin1222@mail.com',
                password: '123456',
            }
            chai
                .request(app)
                .post('/users/user')
                .send(newUser)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(201)
                    expect(res).to.be.an('object')
                    expect(res.body).to.have.property('name')
                    expect(res.body).to.have.property('email')
                    expect(res.body).to.have.property('password')
                    done()
                })
        })
        it('should return user login with object that have token key and user profile with status code 200' , function (done) {
            let userLogin = {
                email: 'khevin1222@mail.com',
                password: '123456'
            }
            chai
                .request(app)
                .post('/users/login')
                .send(userLogin)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.be.an('object')
                    expect(res.body).to.have.property('token')
                    expect(res.body).to.have.property('email')
                    expect(res.body).to.have.property('name')
                    token = res.body.token
                    done()
                })
        })
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
        it('should return new cart object with status code 200', function (done) {
            
            chai
                .request(app)
                .post(`/carts/${productId}`)
                .set('token', token)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body[0]).to.have.property('userId')
                    expect(res.body[0]).to.have.property('products')
                    done()
                })
        })
        it('should return an object error message when token is empty with status code 401', function (done) {
            chai
                .request(app)
                .post(`/carts/${productId}`)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res.body).to.be.an('object')
                    expect(res.body.msg).to.equal('Unauthorized user')
                    done()
                })
        })
        it('should return new cart object with status code 200', function (done) {  
            chai
                .request(app)
                .put(`/carts/${productId}`)
                .set('token', token)
                .end(function(err, res) {
                    console.log(res.body)
                    expect(err).to.be.null
                    expect(res).to.be.an('object')
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.length(0)
                    done()
                })
        })
    })
})