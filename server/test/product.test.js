const chai = require('chai'),
    chaihttp = require('chai-http'),
    expect = chai.expect,
    app = require('../app'),
    clearProduct = require('../helpers/clearProduct');

chai.use(chaihttp)

before(function (done) {
    clearProduct(done)
})

after(function (done)  {
    clearProduct(done)
})

describe('Test Error Product', () => {
    describe('Product Test', () => {
        let input = {
            name : 'Mobil Xenia',
            price : 143000000,
            stock : 100,
        }

        let inputUpdate = {
            name : 'Mobil Xenia SR',
            price : 133000000,
            stock : 10,
        }

        let inputErrorBecauseName = {
            name : '',
            price : 143000000,
            stock : 100,
        }

        let inputErrorBecausePrice = {
            name : 'Mobil Xenia',
            stock : 100,
        }

        let _id = ''

        describe('Success and error POST /products',function() {
            it('expected success create Product with status 201', done => {
                chai.request(app)
                    .post('/products')
                    .send(input)
                    .end((err, res) => {
                        expect(err).to.be.null
                        expect(res).to.have.status(201)
                        expect(res.body).to.be.an('object')
                        expect(res.body).to.have.property('name', input.name)
                        expect(res.body).to.have.property('price', input.price)
                        expect(res.body).to.have.property('stock', input.stock)
                        done()
                    })
            })

            it('expected error create product with status 400 because name empty', function(done) {
                chai.request(app)
                    .post('/products')
                    .send(inputErrorBecauseName)
                    .end((err, res) => {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        expect(res.body).to.be.an('object')
                        expect(res.body.msg).to.have.property('name')
                        done()
                    })
            })

            it('expected error create product with status 400 because price empty', function(done) {
                chai.request(app)
                    .post('/products')
                    .send(inputErrorBecausePrice)
                    .end((err, res) => {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        expect(res.body).to.be.an('object')
                        console.log(res.body)
                        expect(res.body.msg).to.have.property('price')
                        done()
                    })
            })

        })
        
        describe('Success GET /products', function() {

            it(`Success get products with body array and status 200`, done =>{
                chai.request(app)
                    .get('/products')
                    .end((err, res) => {
                        _id = res.body[0]._id
                        expect(err).to.be.null
                        expect(res).to.have.status(200)
                        expect(res.body).to.be.an('array')
                        expect(res.body[0].name).to.equal(input.name)
                        done()
                    })
            })
        })

        describe('Success and error PUT /products/:id', function() {

            it(`Success Update products with status 200`, done => {
                chai.request(app)
                    .put(`/products/${_id}`)
                    .send(inputUpdate)
                    .end((err, res) => {
                        expect(err).to.be.null
                        expect(res).to.have.status(200)
                        expect(res.body).to.be.an('object')
                        expect(res.body.nModified).to.equal(1)
                        expect(res.body.n).to.equal(1)
                        expect(res.body.ok).to.equal(1)
                        done()
                    })
            })

            it(`Error Update products with status 400`, done => {
                chai.request(app)
                    .put(`/products/12u41281289h2rhd`)
                    .send(inputUpdate)
                    .end((err, res) => {
                        expect(err).to.be.null
                        expect(res).to.have.status(500)
                        expect(res.body).to.be.an('object')
                        expect(res.body.msg).to.be.an('string')
                        done()
                    })
            })
        })

        describe('Success and error DELETE /products/:id', function() {

            it('Success Delete Product with status 200', done => {
                chai.request(app)
                    .delete(`/products/${_id}`)
                    .end((err, res) => {
                        expect(err).to.be.null
                        expect(res).to.have.status(200)
                        done()
                    }) 
            })

            it('Error Delete Product with sttus 500 because params _id invalid', done => {
                chai.request(app)
                    .delete(`/products/123123432523safea`)
                    .end((err, res) => {
                        expect(err).to.be.null
                        expect(res).to.have.status(500)
                        expect(res.body).to.be.an('object')
                        expect(res.body.msg).to.be.an('string')
                        done()
                    }) 
            })
        })
    })
})

