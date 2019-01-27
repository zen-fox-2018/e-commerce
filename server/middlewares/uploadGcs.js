const { Storage } = require('@google-cloud/storage')


const storage = new Storage({
  projectId: process.env.GCLOUD_PROJECT,
  keyFilename: './mini-wp-mochfamir-f27d1dbeaa30.json'
})

const bucketName = process.env.CLOUD_BUCKET
const bucket = storage.bucket(bucketName)

module.exports = {
  googleStorage: function(req, res, next){
    if(!req.file){
      req.file.cloudStoragePublicUrl = ''
      next()
      return ''
    }
    const gcsname = Date.now()+req.file.originalname
    const file = bucket.file(gcsname)

    const stream = file.createWriteStream({
      metadata: {
        contentType: req.file.mimetype
      },
      resumable: true
    })

    stream.on('error', (err) => {
      req.file.cloudStorageError = err;
      console.log(err)
      res.status(400).json({
        msg: 'error on upload'
      })
    });
    
    stream.on('finish', () => {
      req.file.cloudStorageObject = gcsname;
      file.makePublic().then(() => {
        req.file.cloudStoragePublicUrl = `https://storage.googleapis.com/${bucketName}/${gcsname}`
        next();
      });
    });
  
    stream.end(req.file.buffer);   
  }
}
