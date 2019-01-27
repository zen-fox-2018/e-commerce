const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;
const User = require('../models/user');
const Product = require('../models/product');

chai.use(chaiHttp);

const app = require('../app');
const { request } = chai;

var tokens;
var productId;

before( async () => {
  try {
    await User.create({
      email: 'product@mail.com',
      password: '12345',
      role: 'customer'
    });
    let { body } = await request(app).post('/users/login').send({ email: 'product@mail.com', password: '12345' });
    tokens = body.token;
    let data = await request(app).post('/products').set('token', tokens).send({ title: 'who are you', author: 'nella kharisma', publisher: 'ujang roger', price: 20000, stock: 4, tag: 'horor', image: 'www.com' })
    productId = data.body._id;
  } catch (err) {
    console.log(err);
  };
});

after( async () => {
  try {
    await User.deleteMany({});
    await Product.deleteMany({});
  } catch (err) {
    console.log(err);
  };
});

describe('/products END POINT TESTING', () => {

  describe('/products POST CREATE', () => {

    it ('should return object new item with status 201', (done) => {
      let item = {
        title: 'kisi kisi un',
        author: 'guru guru',
        publisher: 'gramedia',
        price: 50000,
        stock: 10,
        tag: 'School',
        image: 'www.com'
      };
      request(app)
        .post('/products')
        .set('token', tokens)
        .send(item)
        .end( (err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('title');
          expect(res.body).to.have.property('author');
          expect(res.body).to.have.property('publisher');
          expect(res.body).to.have.property('price');
          expect(res.body).to.have.property('stock');
          expect(res.body).to.have.property('tag');
          expect(res.body).to.have.property('image');
          expect(res.body.title).to.equal(item.title);
          expect(res.body.author).to.equal(item.author);
          expect(res.body.publisher).to.equal(item.publisher);
          expect(res.body.price).to.equal(item.price);
          expect(res.body.stock).to.equal(item.stock);
          expect(res.body.tag).to.equal(item.tag);
          expect(res.body.image).to.equal(item.image);
          done();
        });
    });
    it ('should return object error empty title with status 500', (done) => {
      let item = {
        title: '',
        author: 'guru guru',
        publisher: 'gramedia',
        price: 50000,
        stock: 10,
        tag: 'School',
        image: 'www.com'
      };
      request(app)
        .post('/products')
        .set('token', tokens)
        .send(item)
        .end( (err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(500);
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('errors')
          done();
        });
    });
    it ('should return object error only space title with status 500', (done) => {
      let item = {
        title: '        ',
        author: 'guru guru',
        publisher: 'gramedia',
        price: 50000,
        stock: 10,
        tag: 'School',
        image: 'www.com'
      };
      request(app)
        .post('/products')
        .set('token', tokens)
        .send(item)
        .end( (err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(500);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('errors');
          done();
        });
    });
    it ('should return object error empty author with status 500', (done) => {
      let item = {
        title: 'kisi kisi un',
        author: '',
        publisher: 'gramedia',
        price: 50000,
        stock: 10,
        tag: 'School',
        image: 'www.com'
      };
      request(app)
        .post('/products')
        .set('token', tokens)
        .send(item)
        .end( (err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(500);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('errors');
          done();
        });
    });
    it ('should return object error only space author with status 500', (done) => {
      let item = {
        title: 'kisi kisi un',
        author: '          ',
        publisher: 'gramedia',
        price: 50000,
        stock: 10,
        tag: 'School',
        image: 'www.com'
      };
      request(app)
        .post('/products')
        .set('token', tokens)
        .send(item)
        .end( (err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(500);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('errors');
          done();
        });
    });
    it ('should return object error empty publisher with status 500', (done) => {
      let item = {
        title: 'kisi kisi un',
        author: 'guru guru',
        publisher: '',
        price: 50000,
        stock: 10,
        tag: 'School',
        image: 'www.com'
      };
      request(app)
        .post('/products')
        .set('token', tokens)
        .send(item)
        .end( (err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(500);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('errors');
          done();
        })
    });
    it ('should return object error only space publisher with status 500', (done) => {
      let item = {
        title: 'kisi kisi un',
        author: 'guru guru',
        publisher: '          ',
        price: 50000,
        stock: 10,
        tag: 'School',
        image: 'www.com'
      };
      request(app)
        .post('/products')
        .set('token', tokens)
        .send(item)
        .end( (err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(500);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('errors');
          done();
        });
    });
    it ('should return object error empty price with status 500', (done) => {
      let item = {
        title: 'kisi kisi un',
        author: 'guru guru',
        publisher: 'gramedia',
        stock: 10,
        tag: 'School',
        image: 'www.com'
      };
      request(app)
        .post('/products')
        .set('token', tokens)
        .send(item)
        .end( (err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(500);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('errors');
          done();
        });
    });
    it ('should return object error empty stock with status 500', (done) => {
      let item = {
        title: 'kisi kisi un',
        author: 'guru guru',
        publisher: 'gramedia',
        price: 50000,
        tag: 'School',
        image: 'www.com'
      };
      request(app)
        .post('/products')
        .set('token', tokens)
        .send(item)
        .end( (err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(500);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('errors');
          done();
        })
    });
    it ('should return object error empty tag with status 500', (done) => {
      let item = {
        title: 'kisi kisi un',
        author: 'guru guru',
        publisher: 'gramedia',
        price: 50000,
        stock: 10,
        tag: '',
        image: 'www.com'
      };
      request(app)
        .post('/products')
        .set('token', tokens)
        .send(item)
        .end( (err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(500);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('errors');
          done();
        });
    });
    it ('should return object error only space tag with status 500', (done) => {
      let item = {
        title: 'kisi kisi un',
        author: 'guru guru',
        publisher: 'gramedia',
        price: 50000,
        stock: 10,
        tag: '             ',
        image: 'www.com'
      };
      request(app)
        .post('/products')
        .set('token', tokens)
        .send(item)
        .end( (err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(500);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('errors');
          done();
        });
    });
    it ('should return object error empty image with status 500', (done) => {
      let item = {
        title: 'kisi kisi un',
        author: 'guru guru',
        publisher: 'gramedia',
        price: 50000,
        stock: 10,
        tag: 'School',
        image: ''
      };
      request(app)
        .post('/products')
        .set('token', tokens)
        .send(item)
        .end( (err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(500);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('errors');
          done();
        });
    });
    it ('should return object error only space image with status 500', (done) => {
      let item = {
        title: 'kisi kisi un',
        author: 'guru guru',
        publisher: 'gramedia',
        price: 50000,
        stock: 10,
        tag: 'School',
        image: '           '
      };
      request(app)
        .post('/products')
        .set('token', tokens)
        .send(item)
        .end( (err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(500);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('errors');
          done();
        });
    });
    it ('should return obejct error not found path with status 404', (done) => {
      let item = {
        title: 'kisi kisi un',
        author: 'guru guru',
        publisher: 'gramedia',
        price: 50000,
        stock: 10,
        tag: 'School',
        image: 'www.com'
      };
      request(app)
        .post('/pr0ducts')
        .set('token', tokens)
        .send(item)
        .end( (err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(404);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('not found');
          done();
        });
    });

  });

  describe('/products GET READ PRODUCT', () => {

    it ('should return array of object product with status 200', (done) => {
      request(app)
        .get('/products')
        .end( (err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });
    it ('should return object error path not found with status 404', (done) => {
      request(app)
        .get('/pr0ducts')
        .end( (err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(404);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('not found');
          done();
        })
    })

  });

  describe('/products/:id PUT UPDATE PRODUCT', () => {

    it ('should return object new update with status 200', (done) => {
      let update = {
        title: 'kisi kisi un',
        author: 'guru guru',
        publisher: 'gramedia',
        price: 50000,
        stock: 10,
        tag: 'School'
      };
      request(app)
        .put(`/products/${productId}`)
        .set('token', tokens)
        .send(update)
        .end( (err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('title');
          expect(res.body).to.have.property('author');
          expect(res.body).to.have.property('publisher');
          expect(res.body).to.have.property('price');
          expect(res.body).to.have.property('stock');
          expect(res.body).to.have.property('tag');
          expect(res.body).to.have.property('image');
          expect(res.body.title).to.equal(update.title);
          expect(res.body.author).to.equal(update.author);
          expect(res.body.publisher).to.equal(update.publisher);
          expect(res.body.price).to.equal(update.price);
          expect(res.body.stock).to.equal(update.stock);
          expect(res.body.tag).to.equal(update.tag);
          done();
        });
    });
    it ('should return object error invalid token with status 500', (done) => {
      let update = {
        title: 'kisi kisi un',
        author: 'guru guru',
        publisher: 'gramedia',
        price: 50000,
        stock: 10,
        tag: 'School'
      };
      request(app)
        .put(`/products/${productId}`)
        .set('token', 'initokenboongan')
        .send(update)
        .end( (err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(500);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('errors');
          done();
        });
    });
    it ('should return object error not found product with status 400', (done) => {
      let update = {
        title: 'kisi kisi un',
        author: 'guru guru',
        publisher: 'gramedia',
        price: 50000,
        stock: 10,
        tag: 'School'
      };
      request(app)
        .put('/products/iniidboongan')
        .set('token', tokens)
        .send(update)
        .end( (err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('product not found');
          done();
        });
    });
    it ('should return object error empty string title with status 500', (done) => {
      let update = {
        title: '',
        author: 'guru guru',
        publisher: 'gramedia',
        price: 50000,
        stock: 10,
        tag: 'School'
      };
      request(app)
        .put(`/products/${productId}`)
        .set('token', tokens)
        .send(update)
        .end( (err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(500);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('errors');
          done();
        });
    });
    it ('should return object error rmpty string author with status 500', (done) => {
      let update = {
        title: 'kisi kisi un',
        author: '',
        publisher: 'gramedia',
        price: 50000,
        stock: 10,
        tag: 'School'
      };
      request(app)
        .put(`/products/${productId}`)
        .set('token', tokens)
        .send(update)
        .end( (err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(500);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('errors');
          done();
        });
    });
    it ('should return object error empty string publisher with status 500', (done) => {
      let update = {
        title: 'kisi kisi un',
        author: 'guru guru',
        publisher: '',
        price: 50000,
        stock: 10,
        tag: 'School'
      };
      request(app)
        .put(`/products/${productId}`)
        .set('token', tokens)
        .send(update)
        .end( (err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(500);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('errors');
          done();
        });
    });
    it ('should return object error empty stinrg price with status 500', (done) => {
      let update = {
        title: 'kisi kisi un',
        author: 'guru guru',
        publisher: 'gramedia',
        stock: 10,
        tag: 'School'
      };
      request(app)
        .put(`/products/${productId}`)
        .set('token', tokens)
        .send(update)
        .end( (err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(500);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('errors');
          done();
        })
    });
    it ('should return object error empty stock with status 500', (done) => {
      let update = {
        title: 'kisi kisi un',
        author: 'guru guru',
        publisher: 'gramedia',
        price: 50000,
        tag: 'School'
      };
      request(app)
        .put(`/products/${productId}`)
        .set('token', tokens)
        .send(update)
        .end( (err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(500);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('errors');
          done();
        });
    });
    it ('should return object error empty string tag with status 500', (done) => {
      let update = {
        title: 'kisi kisi un',
        author: 'guru guru',
        publisher: 'gramedia',
        price: 50000,
        stock: 10,
        tag: ''
      };
      request(app)
        .put(`/products/${productId}`)
        .set('token', tokens)
        .send(update)
        .end( (err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(500);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('errors');
          done();
        });
    });
    it ('should retutn object error invalid path endpoint with status 404', (done) => {
      let update = {
        title: 'kisi kisi un',
        author: 'guru guru',
        publisher: 'gramedia',
        price: 50000,
        stock: 10,
        tag: 'School'
      };
      request(app)
        .put(`/pr0ducts/${productId}`)
        .set('token', tokens)
        .send(update)
        .end( (err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(404);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('not found');
          done()
        });
    });

  });

  describe('/products/:id DELETE PRODUCT', () => {

    it ('should return object success delete with status 200', (done) => {
      request(app)
        .delete(`/products/${productId}`)
        .set('token', tokens)
        .end( (err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('_id');
          expect(res.body._id).to.equal(productId);
          done();
        })
    })
    it ('should return object error product not found with status 404', (done) => {
      request(app)
        .delete(`/products/iniidboongan`)
        .set('token', tokens)
        .end( (err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(404);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('product not found');
          done();
        });
    });
    it ('should retutn object error invalid token with status 500', (done) => {
      request(app)
        .delete(`/products/${productId}`)
        .set('token', 'initokenboongan')
        .end( (err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(500);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('errors');
          done();
        });
    });
    it ('should return object error invalid path endpoint with status 404', (done) => {
      request(app)
        .delete(`/pr0ducts/${productId}`)
        .set('token', tokens)
        .end( (err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(404);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('not found');
          done();
        });
    });

  });

});