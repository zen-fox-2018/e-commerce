const   chai = require('chai'),
        chaiHttp = require('chai-http'),
        app = require('../app')
        expect = chai.expect,
        User = require('../models/user'),
        jwt = require('jsonwebtoken'),
        like = require('chai-like')

chai.use(chaiHttp)
chai.use(like);
var token, secondToken

describe('category', function(){
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
            done()
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
            done()
        })
    })
    it(`should return created category when create category `, function(done){
        var input = {
            name : ''
        }
        chai.request(app)
            .post('/categories')
            .set('token', token)
            .send(input)
            .end(function(err, res){
                expect(err).to.be.null
                expect(res).to.have.status(201)
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.keys(['data', 'message'])
                expect(res.body).to.have.property('message', 'category created')
                done()
            })
    })
    it(`should return error 401 when user with role not admin create tag`, function(done){
        var input = {
            name : ''
        }
        chai.request(app)
            .post('/categories')
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

})
