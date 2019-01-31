const Category = require('../models/Category.js')
const Product = require('../models/Product.js')

module.exports = {
  addCategory(req,res){
    Category.create({name: req.body.name})
    .then(category => {
      res.status(200).json({category, message: 'Success add category'})
    })
    .catch( error => {
      res.status(400).json({message: error.message})
    })
  },

  showCategories(req,res){
    Category.find({})
    .sort({name: 1})
    .then(categories => {
      res.status(200).json(categories)
    })
    .catch( error => {
      console.log(error)
      res.status(400).json({message: error.message})
    })
  },

  editCategory(req,res){
    let id = req.params.id
    let newCategory = req.body
    Category.findByIdAndUpdate(id, newCategory, {new: true})
    .then(category => {
      res.status(200).json({category, message: "success edit category"})
    })
    .catch( error => {
      res.status(400).json({message: error.message})
    })
  },

  deleteCategory(req,res){
    let id = req.params.id

    Product.find({category: id})
    .then( products => {
      if(products.length > 0){
        throw({message: 'cannot delete category, there is products on this category'})
      } else {
        return Category.findByIdAndDelete(id)
      }
    })
    .then( data => {
      res.status(200).json({message: 'success delete category'})
    })
    .catch( error => {
      console.log(error)
      res.status(400).json({message: error.message})
    })
  }
}