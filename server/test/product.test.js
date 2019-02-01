let id = ``
const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = require('chai').expect
const app = require('../app')
const Product = require('../models/Product')

chai.use(chaiHttp);
let token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjNDVjYjRhOGM2MjcwMzBkNmYwNmJkZSIsImlhdCI6MTU0ODA4MDA3OX0.m8mCaVsH6oVTUm20jfwlT2pnhpgeacows7BkB9mRTeA`
let token2 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjNDU4OWM0M2Q5MThjMjBjZDI2MWI3ZiIsImlhdCI6MTU0ODA2MTM4OX0.yZvND2LRLGvt-7hem2Mn6WMeYVRFOyN1MCZt2VAn6Nk'

describe('Products', function() {

    describe('create product', function() {
        //nambahin testing product g boleh kurang dati 1/ minus

        //1
        it('should return created products' , function (done) {
            chai.request(app)
                .post('/products')
                .set({ token })
                .send({
                    name: 'bag',
                    description: 'just a bag',
                    price: 10000
                })
                .end((err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(201)
                    id = res.body.data._id
                    expect(res.body).to.have.property('data')
                    expect(res.body).to.have.property('msg')
        
                    done()
                })
        })

        //2
        it('should return please login (send wrong headers)' , function (done) {
            chai.request(app)
                .post('/products')
                .set({ token2 })
                .send({
                    name: 'bag',
                    description: 'just a bag',
                    price: 10000
                })
                .end((err, res) => {
                    console.log(res.body)
                    console.log(err)
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal('Please login first')
        
                    done()
                })
        })
        
        //3
        it('should return please login (no headers)' , function (done) {
            chai.request(app)
                .post('/products')
                .send({
                    name: 'bag',
                    description: 'just a bag',
                    price: 10000
                })
                .end((err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal('Please login first')
        
                    done()
                })
        })

        //4
        it('should return User not found' , function (done) {
            chai.request(app)
                .post('/products')
                .set({ token: token2})
                .send({
                    name: 'bag',
                    description: 'just a bag',
                    price: 10000
                })
                .end((err, res) => {
                    console.log(res.body)
                    console.log(err)
                    expect(err).to.be.null
                    expect(res).to.have.status(404)
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal('User not found')
        
                    done()
                })
        })

        //5
        it('should return Name and price must be filled (name => null)' , function (done) {
            chai.request(app)
                .post('/products')
                .set({ token })
                .send({
                    name: '',
                    description: 'just a bag',
                    price: 10000
                })
                .end((err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)

                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal('Name and price must be filled')

                    done()
                })
        })

         //6
         it('should return Name and price must be filled (price => null)' , function (done) {
            chai.request(app)
                .post('/products')
                .set({ token })
                .send({
                    name: '',
                    description: 'just a bag',
                    price: ''
                })
                .end((err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)

                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal('Name and price must be filled')

                    done()
                })
        })

        //7
        // it('should return type of price must be number (model validation)' , function (done) {
        //     chai.request(app)
        //         .post('/products')
        //         .set({ token })
        //         .send({
        //             name: 'bag',
        //             description: 'just a bag',
        //             price: 'fff'
        //         })
        //         .end((err, res) => {
        //             expect(err).to.be.null
        //             expect(res).to.have.status(500)
        //             // console.log(res.body)
        //             expect(res.body).to.have.property('msg')
        //             expect(res.body.msg).to.equal('Product validation failed: price: Cast to Number failed for value "fff" at path "price')

        //             done()
        //         })
        // })

        //8
        it('should return type of price must be number (controller validation)' , function (done) {
            chai.request(app)
                .post('/products')
                .set({ token })
                .send({
                    name: 'bag',
                    description: 'just a bag',
                    price: 'fff'
                })
                .end((err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    // console.log(res.body)
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal('Price must be number')

                    done()
                })
        })

        //9
        // it('should return invalid signature (wrong jwt secret)' , function (done) {
        //     chai.request(app)
        //         .post('/products')
        //         .set({ token })
        //         .send({
        //             name: 'bag',
        //             description: 'just a bag',
        //             price: 10000
        //         })
        //         .end((err, res) => {
        //             expect(err).to.be.null
        //             expect(res).to.have.status(400)
        //             expect(res.body).to.have.property('msg')
        //             expect(res.body.msg).to.equal('invalid signature')
        
        //             done()
        //         })
        // })

    })
    
    describe('get all products', function() {

        it('should return all products', function(done) {
            chai.request(app)
                .get('/products')
                .end((err, res) => {
                    // console.log(res.body)
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
            
                    expect(res.body).to.have.property('data')
                    expect(res.body.data).to.be.an('array')
                    done()
                })
        })

    })

    describe('edit product', function() {

        //1
        it('should return You are not authorized', function (done) {
            id = `5c457e6787d1971ca30b962b`
            chai.request(app)
                .put(`/products/${id}`)
                .send({
                    name: 'ubah'
                })
                .set({ token })
                .end( (err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
            
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal('You are not authorized')
                    done()
                })
        })

        //2
        it('should return wrong product id', function (done) {
            id ='ass'
            chai.request(app)
                .put(`/products/${id}`)
                .send({
                    name: 'ubah'
                })
                .set({ token })
                .end( (err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
            
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal('Id is not valid')
                    done()
                })
        })

        //3 
        it('should return product not found', function (done) {
            id = `5c457e610444391c8b4359bd`
            chai.request(app)
                .put(`/products/${id}`)
                .send({
                    name: 'ubah'
                })
                .set({ token })
                .end( (err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(404)
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal('Product not found')
                    done()
                })
        })

        //4 
        it('should return edited product', function (done) {
            id = `5c45dc2edf7a5c3a414a4c5f`
            chai.request(app)
                .put(`/products/${id}`)
                .send({
                    name: 'ubah'
                })
                .set({ token })
                .end( (err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
            
                    expect(res.body).to.have.property('msg')
                    expect(res.body).to.have.property('data')

                    done()
                })
        })

        //5
        it('should return edited price must be number', function (done) {
            id = `5c45dc2edf7a5c3a414a4c5f`
            chai.request(app)
                .put(`/products/${id}`)
                .send({
                    name: 'ubah',
                    price: '22d'
                })
                .set({ token })
                .end( (err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
            
                    expect(res.body).to.have.property('msg')

                    expect(res.body.msg).to.equal('Price must be number')
                    done()
                })
        })
    })
    
    describe('delete product', function() {
        let idDel = ''
        before(function(done) {
            Product.create({
                name: 'test del',
                price: 1000,
                userId: `5c45cb4a8c627030d6f06bde`
            })
            .then(data => {
                idDel = data._id
                done()
            })
            .catch(err => {
                console.log(err)
            })
        })

        //1
        it('should delete product', function (done) {
            chai.request(app)
                .delete(`/products/${idDel}`)
                .set({ token })
                .end( (err, res) => {
                    console.log(res.body)
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
            
                    expect(res.body).to.have.property('msg')
        
                    done()
                })
        })

        //2
        it('should return you are not authorized', function (done) {
            id = `5c457e6787d1971ca30b962b`
            chai.request(app)
                .delete(`/products/${id}`)
                .set({ token })
                .end( (err, res) => {
                    console.log(res.body)
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
            
                    expect(res.body).to.have.property('msg')
        
                    done()
                })
        })

        //3
        it('should return product not found', function (done) {
            id = `5c457e610444391c8b4359bd`
            chai.request(app)
                .delete(`/products/${id}`)
                .send({
                    name: 'ubah'
                })
                .set({ token })
                .end( (err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(404)
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal('Product not found')
                    done()
                })
        })

        //4
        it('should return wrong product id', function (done) {
            id ='ass'
            chai.request(app)
                .put(`/products/${id}`)
                .send({
                    name: 'ubah'
                })
                .set({ token })
                .end( (err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
            
                    expect(res.body).to.have.property('msg')
                    expect(res.body.msg).to.equal('Id is not valid')
                    done()
                })
        })

    })

})