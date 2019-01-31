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
                password: "example",
                provinceId: 2,
                cityId: 2
            })
            .end(function (err, res) {
                expect(res.body).to.be.a('object')
                expect(res.body.email).to.exist
                expect(res.body.password).to.exist
                done()
            })
    })

    it('should not register user', function (done) {
        chai.request(app)
            .post(`/users`)
            .send({
                email: "example@mail.com",
                password: "example",
            })
            .end(function (err, res) {
                console.log(res.body);
                expect(res.body).to.be.a('object')
                expect(res.body.msg).to.exist
                done()
            })
    })

    it('should not register user', function (done) {
        chai.request(app)
            .post(`/users`)
            .send({
                email: "example@mail.com",
                password: "example",
                cityId: 2
            })
            .end(function (err, res) {
                console.log(res.body);
                expect(res.body.msg).to.exist
                done()
            })
    })

    it('should not register user', function (done) {
        chai.request(app)
            .post(`/users`)
            .send({
                email: "example@mail.com",
                provinceId: 2
            })
            .end(function (err, res) {
                console.log(res.body);
                expect(res.body.msg).to.exist
                done()
            })
    })

    it('should not register user', function (done) {
        chai.request(app)
            .post(`/users`)
            .send({
                password: "example",
                provinceId: 2
            })
            .end(function (err, res) {
                console.log(res.body);
                expect(res.body.msg).to.exist
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
                category: "Fantasy",
                weight: 1,
                imageUrl: "data:image/jpeg;base64,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"
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

    it('should not create Product', function (done) {
        chai.request(app)
            .post(`/products`)
            .set('token', token)
            .send({
                name: "The Lord Of The Rings",
                price: 8000000,
                stock: 5,
                category: "Fantasy",
                weight: 1,
            })
            .end(function (err, res) {
                console.log(res.body);
                productId = res.body._id
                expect(res.body.msg).to.exist
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
                console.log(res.body);
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


