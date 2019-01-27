var assert = require('assert');
var mongoose = require(`mongoose`)
var User = require(`../models/User`)
var Product = require(`../models/Product`)
var Product = require(`../models/Product`)

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
var expect = chai.expect

//Set node env to test
process.env.NODE_ENV = 'test'

console.clear()

chai.use(chaiHttp);

//GLOBAL
var productId = undefined
var userId = undefined
var token = undefined


//TESTING
describe('/POST User', function () {
    before(function (done) {
        User.deleteMany({}, function () {
            done()
        })
    })

    it('should register user', function (done) {
        chai.request(app)
            .post(`/users`)
            .send({
                email: "example@mail.com",
                password: "example"
            })
            .end(function (err, res) {
                expect(res.body).to.be.a('object')
                expect(res.body.email).to.exist
                expect(res.body.password).to.exist
                done()
            })
    })

    it('should error, registering duplicate email', function (done) {
        chai.request(app)
            .post(`/users`)
            .send({
                email: "example@mail.com",
                password: "example"
            })
            .end(function (err, res) {
                expect(res.body).to.be.a('object')
                expect(res.status).to.equals(401)
                done()
            })
    })

    it(`should success login`, function (done) {
        chai.request(app)
            .post(`/users/login`)
            .send({
                email: "example@mail.com",
                password: "example"
            })
            .end(function (err, res) {
                console.log(res.body);
                userId = res.body.id
                token = res.body.token
                expect(res.body).to.be.a(`object`)
                expect(res.body.email).to.exist
                expect(res.body.token).to.exist
                done()
            })
    })

    it(`should error, login w/ wrong email`, function (done) {
        chai.request(app)
            .post(`/users/login`)
            .send({
                email: "wrongemail@mail.com",
                password: "example"
            })
            .end(function (err, res) {
                expect(res.status).to.equals(400)
                done()
            })
    })

})

describe('/POST Product', function () {
    before(function (done) {
        Product.remove({}, function (err) {
            done()
        })
    })

    it('should success create Product', function (done) {
        chai.request(app)
            .post(`/products`)
            .set('token', token)
            .send({
                name: "The Lord Of The Rings",
                price: 8000000,
                stock: 5,
            })
            .end(function (err, res) {
                console.log(res.body);
                productId = res.body._id
                expect(res.body.name).to.equals("The Lord Of The Rings")
                expect(res.body.price).to.equals(8000000)
                expect(res.body.stock).to.equals(5)
                done()
            })
    })

    it('should error create Product w/ missing attribute', function (done) {
        chai.request(app)
            .post(`/products`)
            .send({
                name: "Samsung S8",
                stock: 5
            })
            .end(function (err, res) {
                expect(res.status).to.equals(401)
                done()
            })
    })

})

describe(`/GET Product`, function () {
    it(`should success find all product`, function (done) {
        chai.request(app)
            .get(`/products`)
            .set(`token`, token)
            .end(function (err, res) {
                expect(res.body).to.have.lengthOf(1)
                done()
            })
    })

    it(`should get empty product when find one product`, function (done) {
        chai.request(app)
            .get(`/products/5c458c36e29a217dc72dc1a5`)
            .end(function (err, res) {
                expect(res.status).to.equals(401)
                done()
            })
    })

})

describe(`/PUT Product`, function () {
    it(`should success update one product`, function (done) {
        chai.request(app)
            .put(`/products/${productId}`)
            .end(function (err, res) {
                expect(res.body).is.a('object')
                done()
            })
    })

    it(`should cant update one product`, function (done) {
        chai.request(app)
            .put(`/products/5c458c36e29a217dc72dc1a5`)
            .set(`token`, token)
            .end(function (err, res) {
                expect(res.status).to.equals(404)
                done()
            })
    })
})

describe(`/DELETE Product`, function () {
    it(`should delete one product`, function (done) {
        chai.request(app)
            .delete(`/products/${productId}`)
            .set('token', token)
            .end(function (err, res) {
                expect(res.body._id).to.exist
                done()
            })
    })

    it(`should cant delete one product with wrong product id`, function (done) {
        chai.request(app)
            .delete(`/products/5c458c36e29a217dc72dc1a5`)
            .set(`token`, token)
            .end(function (err, res) {
                expect(res.status).to.equals(404)
                done()
            })
    })
})

describe(`/POST Cart`, function () {
    console.log(productId);

    it('should create cart', function (done) {
        console.log(productId);

        chai.request(app)
            .post(`/users/cart/${userId}`)
            .set(`token`, token)
            .send({
                itemId: productId
            })
            .end(function (err, res) {
                expect(res.status).to.equals(201)
                done()
            })
    })

    it('should update quantity of cart', function (done) {
        chai.request(app)
            .post(`/users/cart/${userId}`)
            .set(`token`, token)
            .send({
                itemId: productId
            })
            .end(function (err, res) {
                expect(res.status).to.equals(201)
                done()
            })
    })
})


