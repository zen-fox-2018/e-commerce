const chai = require('chai'),
    chaihttp = require('chai-http'),
    expect = chai.expect,
    app = require('../app'),
    clearUser = require('../helpers/clearUser');

chai.use(chaihttp)

before(function (done) {
    clearUser(done)
})

after(function (done)  {
    clearUser(done)
})


describe(`Login dan Authentication Test`, function ()  {
let token = ''

    describe('TEST POST /users/register ', function() {
        let registerUser = {
            username : "Christian Sihotang",
            password : "12345678",
            email : 'christian@mail.com'
        }
        let registerUserEmailGagal = {
            username : "Christian Sihotang",
            password : "12345678",
            email : 'christian'
        }
        let registerUserPasswordGagal = {
            username : "Christian Sihotang",
            password : "",
            email : 'christians@mail.com'
        }
        let registerUserUsernameGagal = {
            username : "",
            password : "12341245",
            email : 'christians@mail.com'
        }
        it('User Register expected success',function (done) {
            this.timeout(5000)
            chai.request(app)
                .post('/users/register')
                .send(registerUser)
                .end(function (err, res)  {
                    expect(err).to.be.null
                    expect(res).to.have.status(201)
                    expect(res.body).to.have.property('email', registerUser.email)
                    expect(res.body).to.have.property('username', registerUser.username)
                    expect(res.body.password).to.not.equal(registerUser.password)
                    done()
                })
        })

        it('User Register expected fail with status 400 because email is unique',function (done) {
            this.timeout(5000)
            chai.request(app)
                .post('/users/register')
                .send(registerUser)
                .end(function (err, res)  {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.have.property('msg')
                    done()
                })
        })

        it('User Register expected fail with status 400 because not in email format',function (done) {
            this.timeout(5000)
            chai.request(app)
                .post('/users/register')
                .send(registerUserEmailGagal)
                .end(function (err, res)  {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.have.property('msg')
                    done()
                })
        })

        it('User Register expected fail with status 400l because password is required',function (done) {
            this.timeout(5000)
            chai.request(app)
                .post('/users/register')
                .send(registerUserPasswordGagal)
                .end(function (err, res)  {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.have.property('msg')
                    done()
                })
        })

        it('User Register expected fail with status 400 because username is required',function (done) {
            this.timeout(5000)
            chai.request(app)
                .post('/users/register')
                .send(registerUserUsernameGagal)
                .end(function (err, res)  {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.have.property('msg')
                    done()
                })
        })
    })
    

    describe('TEST POST users/login', function() {

        let loginUserEmailWrong = {
            email : 'christian@maail.com',
            password : '12345678'
        }
        let loginUserPasswordWrong = {
            email : 'christian@mail.com',
            password : '12345'
        }
        let loginUserCorrect = {
            email : 'christian@mail.com',
            password : '12345678'
        }

        it('Post users/login expected error because email wrong', function(done) {
            this.timeout(3000)
            chai.request(app)
                .post('/users/login')
                .send(loginUserEmailWrong)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.have.property('msg')
                    done()
                })
        })

        it('Post users/login expected error because password wrong', function(done) {
            this.timeout(3000)
            chai.request(app)
                .post('/users/login')
                .send(loginUserPasswordWrong)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.have.property('msg')
                    done()
                })
        })

        it('Post users/login expected success', function(done) {
            this.timeout(5000)
            chai.request(app)
                .post('/users/login')
                .send(loginUserCorrect)
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.property('token')
                    token = res.body.token
                    done()
                })
        })
    })
    
})