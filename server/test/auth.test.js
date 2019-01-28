const   chai = require('chai'),
        chaiHttp = require('chai-http'),
        expect = chai.expect,
        app = require('../app.js'),
        User = require('../models/user')

chai.use(chaiHttp)

describe('Auth', function(){
    var createdUserData = ''
    var inputUserData = {
        email : 'abed@mail.com',
        password : 'abed',
        firstName : 'Abed',
        lastName : 'Nego'
    }
    var inputLoginUser = {
        email : 'abed@mail.com',
        password : 'abed'
    }
    
    before(function(done){
        User.create(inputUserData)
        .then(user => {
            createdUserData = user.data
            done()
        })
        .catch(err => {
            console.log(err)
            done()
        })
    })
    
    after(function(done) {
        User.deleteMany({}, function(err) {
            done()
        });
    })
    
    describe('Register Testing', function() {
        it('should return data user when register', function(done){
            var input = {
                email : 'user@mail.com',
                password : 'user',
                firstName : 'Abed',
                lastName  :'Lubis',
            }
            chai.request(app)
                .post('/register')
                .type('form')
                .send(input)
                .end( function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(201)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.keys(['data', 'message'])
                    expect(res.body.data).to.have.property('email', input.email)
                    expect(res.body.data).to.have.property('password')
                    expect(res.body.data).to.have.property('firstName', input.firstName)
                    expect(res.body.data).to.have.property('lastName', input.lastName)
                    expect(res.body.data).to.have.property('role', 'customer')
                    done()
                })
        })
        it(`should return 'User already exist' when register with the same email`, function(done){
            chai.request(app)
                .post('/register')
                .type('form')
                .send(inputUserData)
                .end(function(err, res){
                    expect(res).to.have.status(400)
                    expect(res.body).to.have.nested.property('error.errors.email.message', 'User already exist')
                    expect(res.body).to.have.property('message', 'Internal server error')
                    done()
                })
        })
        it(`should return 'Please fill a valid email address' when register with the wrong format email`, function(done){
            inputUserData.email = 'notvalidemailco'
            chai.request(app)
                .post('/register')
                .type('form')
                .send(inputUserData)
                .end(function(err, res){
                    expect(res).to.have.status(400)
                    expect(res.body).to.have.nested.property('error.errors.email.message', 'Please fill a valid email address')
                    expect(res.body).to.have.property('message', 'Internal server error')
                    done()
                })
        })
    })
    
    describe('Login Testing', function(){
        it('should return token when login', function(done){
            chai.request(app)
                .post('/login')
                .type('form')
                .send(inputLoginUser)
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.keys(['token', 'message'])
                    expect(res.body.token).to.be.a('string')
                    done()
                })
        })
        it(`should return 'Email/password is wrong' when login with wrong password`, function(done){
            inputLoginUser.password = 'asal'
            chai.request(app)
                .post('/login')
                .type('form')
                .send(inputLoginUser)
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.keys(['message'])
                    expect(res.body).to.have.property('message', 'Email/password is wrong')
                    done()
                })
        })
        it(`should return  'Email/password is wrong' when login with unregistered email`, function(done){
            inputLoginUser.email = 'asal@mail.com'
            chai.request(app)
                .post('/login')
                .type('form')
                .send(inputLoginUser)
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.keys(['message'])
                    expect(res.body).to.have.property('message', 'Email/password is wrong')
                    done()
                })
        })
    })
})
