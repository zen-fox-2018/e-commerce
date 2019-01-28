// Creates a client
const {Storage} = require('@google-cloud/storage');
const googleCloudStorage = new Storage({
  projectId: process.env.GCLOUD_PROJECT_ID,
  keyFilename: process.env.KEY_FILE_NAME
});

//bucket object
const bucket = googleCloudStorage.bucket(process.env.GCLOUD_STORAGE_BUCKET);
//create filename unique
function createFilename(thumbnail) {
  let string;
  let timestamp = new Date().getTime();
  if(thumbnail == true) {
   string = 'img_thumb_' + timestamp + '.jpg';
  } else {
   string = 'img_' + timestamp + '.jpg';
  }
  return string;
}

module.exports = function (req, res, next) {
  console.log('uploading-----------------------------<<<<<<<<')
  //from multer
  if(!req.files) {
    res.status(400).json({error: 'no file was uploaded.'});
  }
  for (file in req.files) {
    console.log(file)
    let isthumb = false;
    file == 1 ? isthumb = true : null;
    req.files[file].originalname = createFilename(isthumb);
    const blob = bucket.file(req.files[file].originalname);
    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: req.files[file].mimetype
      }
    });
    blobStream.on("error", error => {
      console.log(error)
      res.status(400).json({
        error: 'error uploading file to google cloud storage.'
      });
      return;
    });
    blobStream.on("finish", () => {
        // The public URL can be used to directly access the file via HTTP.
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
        // Make the image public to the web (since we'll be displaying it in browser)
        blob.makePublic()
        .then(() => {
          //uploaded image link
          console.log('======>')
          console.log(publicUrl)
          isthumb ? req.thumbUrl = publicUrl : req.imageUrl = publicUrl
        });
      });
    blobStream.end(req.files[file].buffer);
  } 
  next()
}