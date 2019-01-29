'use strict'
require('dotenv').config()

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
    res.status(400).json({
      message: 'Image Not Found',
      error: 'Must upload an Image'
    })
  } else if (!(req.file.mimetype == 'image/jpg' || req.file.mimetype == 'image/jpeg' || req.file.mimetype == 'image/png')) {

    res.status(400).json({
      message: 'Wrong Image Filetype',
      error: 'Please upload image with jpg/jpeg/png extensions'
    })
  } else {
    const gcsname = Date.now() + req.file.originalname
    const file = bucket.file(gcsname)

    const stream = file.createWriteStream({
      metadata: {
        contentType: req.file.mimetype
      }
    })

    stream.on('error', (err) => {
      req.file.cloudStorageError = err
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
  deleteGCS
}