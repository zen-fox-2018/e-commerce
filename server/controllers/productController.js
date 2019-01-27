const Product = require('../models/product');

module.exports = {
  create: async (req, res) => {
    try {
      const newProd =  await Product.create({
        title: req.body.title.trim(),
        author: req.body.author.trim(),
        publisher: req.body.publisher.trim(),
        price: req.body.price,
        stock: req.body.stock,
        tag: req.body.tag.trim(),
        image: req.file.publicUrl.trim()
      });
      res.status(201).json(newProd);
    } catch (err) {
      res.status(500).json({
        errors: err
      });
    };
  },
  find: async (req, res) => {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json({
        errors: err
      })
    };
  },
  update: async (req, res) => {
    try {
      const findProd = await Product.findById(req.params.id);
      if (!findProd) {
        res.status(400).json({
          message: 'product not found'
        });
      } else {
        const updated = await Product.findByIdAndUpdate(req.params.id, {
          title: req.body.title.trim(),
          author: req.body.author.trim(),
          publisher: req.body.publisher.trim(),
          price: req.body.price,
          stock: req.body.stock,
          tag: req.body.tag.trim()
        }, {
          new: true,
          runValidators: true
        });
        res.status(200).json(updated);
      }
    } catch (err) {
      res.status(500).json({
        errors: err
      });
    };
  },
  remove: async (req, res) => {
    try {
      const remove = await Product.findById(req.params.id);
      if (!remove) {
        res.status(404).json({
          message: 'product not found'
        });
      } else {
        const deleted = await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({
          _id: req.params.id
        });
      };
    } catch (err) {
      res.status(500).json({
        errors: err
      })
    };
  }
};