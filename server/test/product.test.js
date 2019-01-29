const   chai = require('chai'),
        chaiHttp = require('chai-http'),
        app = require('../app'),
        expect = chai.expect,
        User = require('../models/user'),
        Product = require('../models/product')
        jwt = require('jsonwebtoken'),
        like = require('chai-like')

chai.use(like);
chai.use(chaiHttp)
var token, secondToken

describe('product', function(){
    before(function(done){
        User.create({
            email : 'admin@mail.com',
            password : 'admin',
            role : 'admin'
        })
        .then(user => {
            token = jwt.sign({
                email : user.email
            }, process.env.JWT_SECRET)
            
            Product.create(
            {
                name : 'Kain brokat Semi-Prancis ',
                description : '100% kain prancis asli. Harga murah se-kota medan',
                price : 1000000,
                stock : 10
            })
            .then(() => {
                done()
            })
        })
    })
    before(function(done){
        User.create({
            email : 'user@mail.com',
            password : 'user'
        })
        .then(user => {
            secondToken = jwt.sign({
                email : user.email
            }, process.env.JWT_SECRET)
            done()
        })
    })
    
    after(function(done){
        User.deleteMany({}, function(){
            Product.deleteMany({}, function() {
                done()
            })
        })
    })
    it(`should return created product when create product `, function(done){
        var input = {
            name : 'Kain brokat Prancis ',
            description : '100% kain prancis asli. Harga murah se-kota medan',
            price : 1000000,
            stock : 10
        }
        chai.request(app)
            .post('/products')
            .set('token', token)
            .send(input)
            .end(function(err, res){
                expect(err).to.be.null
                expect(res).to.have.status(201)
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.keys(['data', 'message'])
                expect(res.body).to.have.property('message', 'product created')
                expect(res.body.data).to.be.like(input)
                done()
            })
    })
    it(`should return error 401 when user with role not admin create product`, function(done){
        var input = {
            name : ''
        }
        chai.request(app)
            .post('/tags')
            .set('token', secondToken)
            .send(input)
            .end(function(err, res){
                expect(err).to.be.null
                expect(res).to.have.status(401)
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.keys(['message'])
                expect(res.body).to.have.property('message', 'Authentication error. Admin only!')
                done()
            })
    })
    it(`should return all products`, function(done){
        chai.request(app)
            .get('/products')
            .end(function(err, res){
                expect(err).to.be.null
                expect(res).to.have.status(200)
                expect(res.body).to.be.an('object')
                done()
            })
    })
    it(`should return updated products when update product`, function(done){
        chai.request(app)
            .put('/products')
            .set('token', token)
            .end(function(err, res){
                expect(err).to.be.null
                expect(res).to.have.status(200)
                expect(res.body).to.be.an('object')
            })
    })

})
