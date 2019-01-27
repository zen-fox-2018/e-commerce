const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { Storage } = require('@google-cloud/storage');

const project_id = process.env.PROJECT_ID

const storage = new Storage ({
  projectId: project_id
})
const bucketName = process.env.BUCKET

const bucket = storage.bucket(bucketName)

module.exports = {
  auth: async (req, res, next) => {
    try {
      const decode = jwt.verify(req.headers.token, process.env.SECRET);
      const user = await User.findOne({
        email: decode.email
      });
      if (!user) {
        res.status(404).json({
          message: 'user not found'
        })
      } else {
        req.decoded = user
        next()
      }
    } catch (err) {
      res.status(500).json({
        errors: err
      });
    };
  },
  googleStorage: async (req, res, next) => {
    if (!req.file) {
      res.status(400).json({
        message: 'image undefined'
      })
    }

    const gcsname = Date.now() + req.file.originalname;
    const file = bucket.file(gcsname);

    const stream = file.createWriteStream({
      metadata: {
        contentType: req.file.mimetype
      },
      resumable: false
    });
  
    stream.on('error', (err) => {
      req.file.cloudStorageError = err;
      res.status(500).json({
        errors: err
      })
    });
  
    stream.on('finish', () => {
      req.file.cloudStorageObject = gcsname;
      file.makePublic().then(() => {
        req.file.publicUrl = `https://storage.googleapis.com/${bucketName}/${gcsname}`;
        next();
      });
    });
  
    stream.end(req.file.buffer);
  },
  admin: (req, res, next) => {
    let role = req.decoded.role
    if (role !== 'admin') {
      res.status(400).json({
        message: 'forbidden'
      })
    } else {
      next()
    }
  }
};