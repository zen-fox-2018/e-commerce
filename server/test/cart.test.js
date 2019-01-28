const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app')
const clearCart = require('../helpers/clearCart')
const { User, Product } = require('../models')

chai.use(chaiHttp)

let user = {}
let product = {}
let token = ''
before(function(done) {
    let newUser = {
        name: 'fauzan',
        email: 'fauzan@mail.com',
        password: 'fauzan'
    }
    Product
        .create({name: 'aaa', price: 1000, stock: 10})
        .then(data => {
            product = data
            return User.create(newUser)
        })
        .then(data => {
            user = data
            chai
            .request(app)
            .post('/users/login')
            .send({email: newUser.email, password: newUser.password})
            .then(data => {
                console.log('============');
                token = data.body.token
                console.log(user);
                console.log(product);
                console.log(token);
                done()
            })
            .catch(err => {
                console.log(err);
            })
        })
        .catch(err => {
            console.log(err);
        })

})

after(function(done) {
    clearCart(done)
})

describe('cart test', function() {
    describe('POST /carts', function() {
        it('should return object with 200 status code', function(done) {
            chai
                .request(app)
                .put('/carts/addProduct')
                .send({productId: product._id, quantity: 1})
                .set('token', token)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object')
                    done()
                })

        })
    })
})