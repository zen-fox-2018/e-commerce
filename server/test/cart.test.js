const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = require('chai').expect
const app = require('../app')

chai.use(chaiHttp);
let id = ''
let productId = `5c45db4c99fecf39fcb60100` //no 14
let token2 = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjNDU4OWM0M2Q5MThjMjBjZDI2MWI3ZiIsImlhdCI6MTU0ODA2MTM4OX0.yZvND2LRLGvt-7hem2Mn6WMeYVRFOyN1MCZt2VAn6Nk`
let token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjNDVjYjRhOGM2MjcwMzBkNmYwNmJkZSIsImlhdCI6MTU0ODA4MDA3OX0.m8mCaVsH6oVTUm20jfwlT2pnhpgeacows7BkB9mRTeA`

describe('Cart', function() {
    //success case
    // it('should return cart data', function(done) {
    //     chai.request(app)
    //         .post('/carts')
    //         .send({
    //             productId
    //         })
    //         .set({ token })
    //         .end((err, res) => {
    //             console.log(res.body)
    //             expect(err).to.be.null
    //             expect(res).to.have.status(201)
    //             id = res.body.data._id
    
    //             expect(res.body).to.have.property('data')
    //             expect(res.body).to.have.property('msg')
    
    //             done()
    //         })
    // })

    describe('Create cart', function() {
        //nambahin testing product g boleh kurang dati 1/ minus

        //1
        it('should return Login first', function(done) {
            chai.request(app)
                .post('/carts')
                .send({
                    productId
                })
                .end((err, res) => {
                    console.log(res.body)
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
        
                    // expect(res.body).to.have.property('data')
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal('Please login first')
        
                    done()
                })
        })
        
        //2
        it('should return user not found', function(done) {
            chai.request(app)
                .post('/carts')
                .set({token: token2})
                .send({
                    productId
                })
                .end((err, res) => {
                    console.log(res.body)
                    expect(err).to.be.null
                    expect(res).to.have.status(404)
        
                    // expect(res.body).to.have.property('data')
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal('User not found')
        
                    done()
                })
        })

        //3
        it('should return product id not valid', function(done) {
            chai.request(app)
                .post('/carts')
                .send({
                    productId: 'aaa'
                })
                .set({token})
                .end((err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal('Product id is not valid')
        
                    done()
                })
        })

        //4
        it('should return product required', function(done) {
            chai.request(app)
                .post('/carts')
                .set({token})
                .end((err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
        
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal('Product id required')
        
                    done()
                })
        })

        //5
        it('should return you cannot buy your own product', function(done) {
            chai.request(app)
                .post('/carts')
                .set({token})
                .send({
                    productId: `5c45dc2edf7a5c3a414a4c5f`
                })
                .end((err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
        
                    expect(res.body).to.have.property('msg')
                    // expect(res.body.msg).to.equal('Product id required')
        
                    done()
                })
        })

    })
    
    //success case
    it('should delete cart', function(done) {
        chai.request(app)
            .delete(`/carts/${id}`)
            .set({ token })
            .end((err, res) => {
                console.log(res.body)
                expect(err).to.be.null
                expect(res).to.have.status(200)
    
                expect(res.body).to.have.property('msg')
    
                done()
            })
    }) 

    describe('Delete cart', function() {

        //1
        it('should return cart id not valid', function(done) {
            chai.request(app)
                .delete(`/carts/kff`)
                .set({ token })
                .end((err, res) => {
                    console.log(res.body)
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
        
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal('Id is not valid')
                    done()
                })
        }) 

        //2
        it('should return cart not found', function(done) {
            chai.request(app)
                .delete(`/carts/5c457e610444391c8b4359bd`)
                .set({ token })
                .end((err, res) => {
                    console.log(res.body)
                    expect(err).to.be.null
                    expect(res).to.have.status(404)
        
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal('Cart not found')
                    done()
                })
        }) 

        //3
        it('should return Login first', function(done) {
            chai.request(app)
                .delete(`/carts/kff`)
                .end((err, res) => {
                    console.log(res.body)
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
        
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal('Please login first')
                    done()
                })
        }) 

        //4
        it('should return User not found', function(done) {
            chai.request(app)
                .delete(`/carts/kff`)
                .set({ token: token2})
                .end((err, res) => {
                    console.log(res.body)
                    expect(err).to.be.null
                    expect(res).to.have.status(404)
        
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal('User not found')
                    done()
                })
        })

        //5
        it('should return jwt malformed (random token)', function(done) {
            chai.request(app)
                .delete(`/carts/kff`)
                .set({ token: 'fmkfk'})
                .end((err, res) => {
                    console.log(res.body)
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
        
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal('jwt malformed')
                    done()
                })
        })
        
        

    })

    
    it('should return deleting all this user cart ', function(done) {
        chai.request(app)
            .delete(`/carts`)
            .set({ token})
            .end((err, res) => {
                console.log(res.body)
                expect(err).to.be.null
                expect(res).to.have.status(200)
    
                expect(res.body).to.have.property('msg')
                expect(res.body.msg).to.equal('Deleting all cart / checkout')
                done()
            })
    })

})