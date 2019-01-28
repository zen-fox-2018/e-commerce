const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = require('chai').expect
const app = require('../app')
const User = require('../models/User')

chai.use(chaiHttp);

// after( function(done) {
//     User.deleteMany({})
//         .then(success => {
//             console.log(`success delete db content`)
//             done()
//         })
//         .catch(err => {
//             console.log(err)
//         })
// })

describe('User', function() {
    // it('should return user data and token', function(done) {
    //     chai.request(app)
    //     .post('/users')
    //     .send({
    //         name: 'Vene',
    //         email: 'Vene@mail.com',
    //         password: 'Vene',
    //         address: 'Bulan'
    //     })
    //     .end( (err, res) => {
    //         expect(err).to.be.null
    //         expect(res).to.have.status(201)
    //         expect(res.body).to.have.property('data')
    //         expect(res.body).to.have.property('token')
    //         done()
    //     })
     
    // })
    
    describe('User register error', function () {
        //1
        it('should return user name required From the controller', function(done) {
            chai.request(app)
            .post('/users')
            .send({
                name: '',
                email: 'Venec@mail.com',
                password: 'Vene',
                address: 'Bulan'
            })
            .end( (err, res) => {
                expect(err).to.be.null
                expect(res).to.have.status(400)
                // console.log(res.body, 'ini bodynyaaaa')
        
                expect(res.body).to.have.property('msg')
                expect(res.body.msg).to.equal(`Name, email and password must be field`)
                done()
            })
         
        })
        
        //2
        it('should return user email validation failed (email already taken)', function(done) {
            chai.request(app)
            .post('/users')
            .send({
                name: 'Vene',
                email: 'Vene@mail.com',
                password: 'Vene',
                address: 'Bulan'
            })
            .end( (err, res) => {
                // expect(err).to.be.null
                expect(res).to.have.status(500)
                // console.log(res.body)
        
                expect(res.body).to.have.property('msg')
                expect(res.body.msg).to.equal(`User validation failed: email: Email already taken`)
                done()
            })
         
        })
       
        //3
        it('should return user email required From the controller', function(done) {
            chai.request(app)
            .post('/users')
            .send({
                name: 'Vene',
                email: '',
                password: 'Vene',
                address: 'Bulan'
            })
            .end( (err, res) => {
                expect(err).to.be.null
                expect(res).to.have.status(400)
                // console.log(res.body, 'ini bodynyaaaa')
        
                expect(res.body).to.have.property('msg')
                expect(res.body.msg).to.equal(`Name, email and password must be field`)
                done()
            })
         
        })
    
        //4
        it('should return user email is not valid ', function(done) {
            chai.request(app)
            .post('/users')
            .send({
                name: 'Vene',
                email: 'vene',
                password: 'Vene',
                address: 'Bulan'
            })
            .end( (err, res) => {
                expect(err).to.be.null
                expect(res).to.have.status(500)
                // console.log(res.body, 'ini bodynyaaaa')
                // console.log(err, 'ini errnya')
                expect(res.body).to.have.property('msg')
                expect(res.body.msg).to.equal(`User validation failed: email: Please fill valid email address`)
                done()
            })
         
        })
    
        //5
        it('should return user password required from controller', function(done) {
            chai.request(app)
            .post('/users')
            .send({
                name: 'Vene',
                email: 'vene',
                password: '',
                address: 'Bulan'
            })
            .end( (err, res) => {
                expect(err).to.be.null
                expect(res).to.have.status(400)
                expect(res.body).to.have.property('msg')
                expect(res.body.msg).to.equal(`Name, email and password must be field`)
                done()
            })
         
        })
    
    })

    it('should return token', function(done) {
        chai.request(app)
            .post('/users/login')
            .send({
                email: 'Vene@mail.com',
                password: 'Vene'
            })
            .end( (err, res) => {
                expect(err).to.be.null
                expect(res).to.have.status(200)
                console.log(res.body)
    
                expect(res.body).to.have.property('msg')
                expect(res.body).to.have.property('token')
                done()
            })
    })

    describe('User login error', function() {
        //1
        it('should return User not found', function(done) {
            chai.request(app)
                .post('/users/login')
                .send({
                    email: 'Vne@mail.com',
                    password: 'Vene'
                })
                .end( (err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(404)
        
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal(`User not found`)

                    done()
                })
        })

        //2
        it('should return Password wrong', function(done) {
            chai.request(app)
                .post('/users/login')
                .send({
                    email: 'Vene@mail.com',
                    password: 'Venee'
                })
                .end( (err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal(`Wrong password`)

                    done()
                })
        })

        //3
        it('should return email is not valid', function(done) {
            chai.request(app)
                .post('/users/login')
                .send({
                    email: 'Venemail.com',
                    password: 'Venee'
                })
                .end( (err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)

                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal(`Email is not valid`)

                    done()
                })
        })

        //4
        it('should return email required', function(done) {
            chai.request(app)
                .post('/users/login')
                .send({
                    email: '',
                    password: 'Venee'
                })
                .end( (err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)

                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal(`All field must be filled`)

                    done()
                })
        })

        //5
        it('should return password required', function(done) {
            chai.request(app)
                .post('/users/login')
                .send({
                    email: '',
                    password: ''
                })
                .end( (err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)

                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal(`All field must be filled`)

                    done()
                })
        })
    })

})



