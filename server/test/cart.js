// const app = require('../app.js');
// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const expect = chai.expect;
// const Product = require('../models/product');
// const User = require('../models/user');
// const Cart = require('../models/cart');
// const {generateToken} = require('../helpers/helper');

// chai.use(chaiHttp);

// describe('Cart', function() {

//   function user() {
//     User.create({
//       name: 'faishal',
//       email: 'faishal@mail.com',
//       password: 'asdqwezxc'
//     })
//       .then(user => {
//         return {user: user, access_token: generateToken(user._id, user.email)}
//       })
//       .catch(err => {
//         return err
//       })
//   }

//   function unauthorizeUser() {
//     User.create({
//       name: 'joni',
//       email: 'joni@mail.com',
//       password: 'asdqwezxc'
//     })
//       .then(user => {
//         return {user: user, access_token: generateToken(user._id, user.email)}
//       })
//       .catch(err => {
//         return err
//       })
//   }

//   function product() {
//     Product.create({
//       name: 'Pohon Jati',
//       price: 3000000,
//       stock: 100,
//       category: 'Pohon',
//       // image: 'https://storage.cloud.google.com/bucket-mini-wp/1547954706138logo.png?_ga=2.199571054.-1110024912.1547867391',
//       user: user().user._id
//     })
//       .then(product => {
//         return product
//       })
//       .catch(err => {
//         return err
//       })
//   }

//   afterEach(function(done) {
//     Cart.deleteMany({})
//       .then(() => {
//         done()
//       })
//       .catch(err => {
//         done()
//       })
//   })

//   let option = {
//     user: user()._id,
//     product: [product()]
//   }

//   function createCart() {
//     Cart.create(option)
//       .then(cart => {
//         return cart
//       })
//       .catch(err => {
//         return err
//       })
//   }

//   describe('POST /carts', function() {
//     it('Should return a new cart', function(done) {
//       chai.request(app)
//       .post('/carts')
//       .set('access_token', user().access_token)
//       .send(option)
//       .end(function(err, res) {
//         expect(err).to.be.null
//         expect(res).to.have.status(201)
//         expect(res.body).to.have.property('user')
//         expect(res.body).to.have.property('product')
//         expect(res.body.user).to.equal(option.user)
//         expect(res.body.user).to.equal(option.product)
//         done()
//       })
//     })
//   })

//   describe('DELETE /cart/:id', function() {
//     before(async function(done) {
//       let dataCart = await createCart()
//       await done()
//     })
//     it('Should return _id of cart', function(done) {
//       chai.request(app)
//       .delete(`/carts/${createCart()._id}`)
//       .set('access_token', user().access_token)
//       .send(option)
//       .end(function(err, res) {
//         expect(err).to.be.null
//         expect(res).to.have.status(200)
//         expect(res.body).to.have.property('_id')
//         expect(res.body._id).to.equal(dataCart._id)
//         done()
//       })
//     })
//   })
// })