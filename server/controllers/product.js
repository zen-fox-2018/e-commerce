const Product = require('../models/Product')

module.exports = {
  create(req, res) {
    console.log('masuk controller create')
    console.log(req.body)
    let { name, description, price, stock, category } = JSON.parse(req.body.data)
    let newProduct = { name, description, price, stock, category }
    newProduct.userId  = req.current_user._id

    if (req.file) {
      newProduct.imageUrl = req.file.cloudStoragePublicUrl
    }

    Product.create(newProduct)
      .then(product => {
        console.log('Creating Product')
        res.status(201).json({product, message: 'Success add product'})
      })
      .catch(error => {
        console.log(error)
        res.status(400).json({error, message: error.message})
      })
  },

  getAll(req,res){
    Product.find()
    .sort({createdAt: -1})
    .populate('category')
    .then( products => {
      res.status(200).json(products)
    })
    .catch( error => {
      console.log(error)
      res.status(500).json({error, message: error.message})
    })
  },

  getOne(req,res){
    Product.findById(req.params.productId)
    .then( product => {
      res.status(200).json(product)
    })
    .catch( error => {
      console.log(error)
      res.status(500).json({error, message: error.message})
    })
  },

  search(req,res){
    console.log('masuk search')
    let query = {}
    let data = {}
    let rangeprice = {}

    if (req.query.name) {
      console.log('ada query name')
      value = new RegExp(req.query.name, 'i')
      data = { name: value }
    }

    if (req.query.pmin || req.query.pmax) {
      console.log('ada query price')
      if(req.query.pmin) {
        rangeprice['$gte'] = Number(req.query.pmin)
      } 
      if(req.query.pmax){
        rangeprice['$lte'] = Number(req.query.pmax)
      }
      data = { price: rangeprice }
    }

    if (req.query.sort) {
      console.log('ada query sort')
      let value = req.query.sort
      if(value === "nameasc"){
        query = {name: 1}
      } else if(value === "namedesc"){
        query = {name: -1}
      } else if(value === "priceasc"){
        query = {price: 1}
      } else if(value === "pricedesc"){
        query = {price: -1}
      }
    }

    if (req.query.category) {
      console.log('ada query category')
      data = { category: req.query.category }
    }

    Product.find(data).sort(query)
    .then( products => {
      // console.log(products)
      res.status(200).json(products)
    })
    .catch( error => {
      console.log(error)
      res.status(500).json({message: error.message})
    })
  },

  getTop(req,res){
    //sort berdasarkan penjualan
    // Product.find()
    // // .sort()
    // .then( products => {
    //   res.status(200).json(products)
    // })
    // .catch( error => {
    //   console.log(error)
    //   res.status(500).json({error, message: error.message})
    // })
  },

  edit(req,res){
    console.log('masuk controller edit')
    console.log(req.body)
    console.log(req.params.productId)
    let productId = req.params.productId
    let editProduct = { name, description, price, stock, category } = JSON.parse(req.body.data)

    if (req.file) {
      editProduct.imageUrl = req.file.cloudStoragePublicUrl
    }

    Product.findByIdAndUpdate(productId, editProduct, {new: true})
    .then( product => {
      res.status(200).json({product, message: "Success edit product"})
    })
    .catch( error => {
      res.status(500).json({error, message: 'Internal Server Error'})
    })
  },

  deleted(req,res){
    console.log('masuk controller delete')
    let productId = req.params.productId

    Product.findByIdAndDelete(productId)
    .then( product => {
      res.status(200).json({message: "Success delete product"})
    })
    .catch( error => {
      res.status(500).json({message: 'Internal Server Error'})
    })
  }
}