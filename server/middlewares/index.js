const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Product = require('../models/product')

function checkLogin(req, res, next) {
    let {token} = req.headers
   try {
       if(token) {
            let payload = jwt.verify(token, `${process.env.JWT_SECRET}`)
            User.findById(payload._id)
            .then(user => {
                req.user = {
                    _id : user._id,
                    email : user.email,
                    username : user.username
                }
                next()
            })
            .catch(err => {
                console.log(err)
                res.status(400).json({
                    msg : "Invalid Token"
                })
            })
       } else {
           res.status(400).json({
               msg : `Invalid Token`
           })
       }
   } catch(err) {
       res.status(500).json({
           msg : err.message
       })
   }
}

function checkProduct(req, res, next) {
    let {productId} = req.body
    Product.findOne({_id : productId})
    .then(product => {
        if(product) {
            next()
        } else {
            next('Product is not found')
        }
    })
    .catch(err => {
        next(err)
    })
}

const { Storage } = require('@google-cloud/storage')

const CLOUD_BUCKET = process.env.CLOUD_BUCKET

const storage = new Storage({
  projectId: process.env.GCLOUD_PROJECT,
  keyFilename: process.env.KEYFILE_PATH
})
const bucket = storage.bucket(CLOUD_BUCKET)

const getPublicUrl = (filename) => {
  return `https://storage.googleapis.com/${CLOUD_BUCKET}/${filename}`
}

const sendUploadToGCS = (req, res, next) => {
  if (!req.file) {
    return next()
  }
  
  const gcsname = Date.now() + req.file.originalname
  
  const file = bucket.file(gcsname)

  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype
    }
  })

  stream.on('error', (err) => {
    req.file.cloudStorageError = err
    console.log(err)
    next(err)
  })

  stream.on('finish', () => {
    req.file.cloudStorageObject = gcsname
    file.makePublic().then(() => {
      req.file.cloudStoragePublicUrl = getPublicUrl(gcsname)
      next()
    })
  })

  stream.end(req.file.buffer)
}

const deleteGCS = (url) => {
  return new Promise((resolve, reject) => {
    bucket.file(url).delete()
      .then(response => {
        resolve(response);
      })
  
      .catch(error => {
        reject(error);
      })
  })
}

const Multer = require('multer'),
      multer = Multer({
        storage: Multer.MemoryStorage,
        limits: {
          fileSize: 5 * 1024 * 1024
        }
        // dest: '../images'
      })

module.exports = {
  getPublicUrl,
  sendUploadToGCS,
  multer, 
  deleteGCS,
  checkLogin,
  checkProduct
}