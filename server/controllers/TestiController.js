const Testi = require('../models/Testi')

class TestiController {

  static getTestis(req, res) {
    Testi.find()
      .then(function(testis) {
        res.status(200).json(testis)
      })
      .catch(function(error) {
        res.status(500).json({
          message: "Internal Server Error",
          error: error
        })
      })
  }

  static createTesti(req, res) {
    let obj = {
      item: req.body.item,
      buyer: req.body.buyer,
      testi: req.body.testi,
      rating: req.body.rating,
    }

    Testi.create(obj)
      .then(function(testi) {
        res.status(200).json(testi)
      })
      .catch(function(error) {
        console.log(error.message);
        res.status(500).json({
          message: "Internal Server Error",
          error: error.message
        })
      })
  }

  static getTesti(req, res) {
    Testi.findById(req.params.testiId)
      .then(function(testi) {
        res.status(200).json(testi)
      })
      .catch(function(error) {
        console.log(error.message);
        res.status(500).json({
          message: "Internal Server Error",
          error: error
        })
      })
  }

  static updateTesti(req, res) {
    Testi.findOneAndUpdate({_id: req.params.testiId}, req.body, {new: true})
      .then(function(testi) {
        res.status(200).json(testi)
      })
      .catch(function(error) {
        res.status(500).json({
          message: "Internal Server Error",
          error: error
        })
      })
  }

  static deleteTesti(req, res) {
    Testi.findOneAndDelete({_id: req.params.testiId})
      .then(function(testi) {
        res.status(200).json(testi)
      })
      .catch(function(error) {
        res.status(500).json({
          message: "Internal Server Error",
          error: error
        })
      })
  }
}

module.exports = TestiController