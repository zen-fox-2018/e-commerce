const chai        = require('chai'),
      chaiHttp    = require('chai-http'),
      expect      = chai.expect,
      app         = require('../app'),
      Model       = require('../models/item');

chai.use(chaiHttp);
let newItemData = {
  name: 'test',
  description: 'test',
  category : ['shoes'],
  stock: 10,
  price: 20000,
  discount: 0.3,
  imageUrl: 'www.url.com'
}
let createNewItem = function () {
  Model.create(newItemData)
  .then(item => {
    return item._id;
  })
}

describe('Item Tests', function () {
  //hooks: clear all items after each test
  afterEach('clear items collection...', function () {
    Model.deleteMany()
    .then(() => console.log('deleted items collection...'))
  });

  describe('POST /', function () {
    it('should send new item object with 200 status code', function (done) {
      chai
        .request(app)
        .post('/items')
        .send(newItemData)
        .end(function (err,res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body.msg).to.equal('successfully created new item.');
          expect(res.body.data).to.equal(newItemData);
          done();        
        })
    });
    it('should send an error message with 400 status code if negative stock', function (done) {
      let failData = newItemData;
      failData.stock = -1;
      chai  
        .request(app)
        .post('/items')
        .send(failData)
        .end(function(err,res) {
          console.log(`====> error: ${err}`);
          expect(err);
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('Error');
          done();
        })
    });
  })
  
  describe('GET /all', function () {
    //insert new items
    before(function(done) {
      const newItems = [newItemData , newItemData]
      Model.insertMany(newItems)
      .then(done())
    });

    it('should send an array of item object with 200 status code', function (done) {
      chai
        .request(app)
        .get('/items/all')
        .end(function (err,res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body.items).to.equal(newItems);
          expect(res.body.msg).to.equal('successfully retrieved new items.');
          done();        
        })
    });   
  })
  describe('PUT /:id', function () {
    //create item first 
    let id;
    before(function(done) {
      id = createNewItem();
      done();
    })
    
    it('should return updated item and status code 200', function (done) {
      let updateData = {
        name: 'updated',
        description: 'updated description',
        category: ['accessories'],
        stock: 7,
        price: 20000,
        discount: 0.4
      };
      chai
      .request(app)
      .put(`/items/${id}`)
      .send(updateData)
      .end(function (err,res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('successfully signed in with google.');
        done();
      })
      
    })  
    it('should fail with status code 400 on invalid stock and price', function (done) {
      let failUpdate = {
        name: 'updated',
        description: 'updated description',
        category: ['accessories'],
        stock: -1,
        price: 5000,
        discount: 0.4
      }
      chai
      .request(app)
      .put(`/items/${id}`)
      .send(failUpdate)
      .end(function (err,res) {
        console.log('=========> fail update on invalid stock');
        console.log(err);
        expect(err).to.exist;
        expect(res).to.have.status(400);
        done();
      })
    })  
  })
  describe('DEL /:id', function(done) {
    let id;
    before(function(done) {
      id = createNewItem();
    })
    it('should delete item and return status code 200', function(done) {
      chai.request(app)
      .del(`/${id}`)
      .end(function(err,res) {
        expect(err).to.be.null;
        expect(res.status).to.be(200);
        expect(res.msg).to.equal('successfully deleted item.');
        expect(res.data).to.equal(newItemData);
        done();
      })
    })
    it('should fail to delete non-existent item id', function(done) {
      let id = 1;
      chai.request(app)
      .del(`/${id}`)
      .end(function(err,res) {
        console.log('=========> fail to delete non existent item id. Err: ')
        console.log(err);
        expect(err).to.exist;
        expect(res.status).to.be(400);
        done();
      })
    })
  })
})