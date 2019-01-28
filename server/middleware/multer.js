var multer= require('multer');
var memoryStorage = multer.memoryStorage;

const m = multer({
  storage: memoryStorage(),
  limits: {
    //5 MB file size limit
    fileSize: 5* 1024 * 1024
  }
})

module.exports = m;