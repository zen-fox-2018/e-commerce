const chai        = require('chai'),
      chaiHttp    = require('chai-http'),
      expect      = chai.expect,
      app         = require('../app'),
      UserModel   = require('../models/user'),
      itemModel   = require('../models/item'),
      jwt         = require('jsonwebtoken'),
      JWT_SECRET  = process.env.JWT_SECRET,
      jwtToken    = null,
      itemId      = null;
      
chai.use(chaiHttp);
//before running tests create user with cart and item
before(function(done) {
  
  let userData = {
    email: 'tester@mail.com',
    password: 'A12345',
    firstName: 'theo',
    lastName: 'darmawan',
    cart: null
  }
  let newItemData = {
    name: 'test',
    description: 'test',
    category : ['shoes'],
    stock: 10,
    price: 20000,
    discount: 0.3,
    imageUrl: 'www.url.com',
    thumbUrl: 
  }
  //how to test image upload? create file in nodejs ? 
    Model.create(newItemData)
    .then(item => {
      itemId = item._id;
      userData.cart = {
        item: item._id,
        quantity: 2
      };
      return UserModel.create(userData);
    })
    .then(newUser => {
      delete newUser.password;
      jwtToken = jwtToken.sign(newUser, JWT_SECRET);
      console.log('created new user with cart item..');
      done();
    })
})

var clearAllCollections = function () {
  UserModel.deleteMany()
  .then(() => {
    console.log('cleared user collection...');
    return itemModel.deleteMany() 
  })
  .then(() => {
    console.log('cleared items collection...');
  })

}
describe('Shopping Cart Tests', function () {
  describe('PUT /', function(done) {
    it('should return status code 200', function(done) {
      chai
      .request(app)
      .put('/')
      .send({
        data: {itemId},
        headers: {authorization : jwtToken}
      })
      .end(function(err,res) {
        expect(err).to.be.null;
        expect(res.status).to.equal(200);
        expect(res.msg).to.equal('successfully updated cart.');
        expect(res.cart).to.exist;
        done();
      })
    })
  })
  describe('GET /checkout', function(done) {
    //delete user cart and reduce item stock
    
  })
})