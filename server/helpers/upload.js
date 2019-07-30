const config = require('../config')
var cloudinary = require("cloudinary").v2;                                               
var multiparty = require('multiparty');
var util = require('util');
if (!config.bucket_name) throw new Error('Please check your configuration!')

//Enter your credentials below                                              
cloudinary.config({
  cloud_name: "dzsf703vh", 
  api_key: "842217184658413", 
  api_secret: "7wGlIcHSM3iF64mY__8T0-Lllpk"                       
});

// AWS
// const aws = require('aws-sdk')

// aws.config.update({
//   'accessKeyId': config.access_key,
//   'secretAccessKey': config.secret_key,
//   'region': config.region,
//   'bucketname': config.bucket_name
// })

// Micro deps
const {createError, send, json} = require('micro')

/**
 * This function will generate a post request to a S3 bucket
 * @param  {req}    req object from micro
 * @param  {res}    res object from micro
 * @return {String} Object response from S3
 */
const postS3 = async (req, res) => {
  var form = new multiparty.Form();

  form.parse(req, function(err, fields, files) {
    if (err) {
      res.writeHead(400, {'content-type': 'text/plain'});
      res.end("invalid request: " + err.message);
      return;
    }
    let filename = util.inspect(files["file"][0]["path"])
    filename = filename.split("'")[1]
    // console.log(filename.split("'"))
    cloudinary.uploader.upload(filename,{ tags: "gotemps",resource_type: "auto" })
    .then(function(file) {
      console.log("Public id of the file is  " + file.public_id);
      console.log("Url of the file is  " + file.url);
      /* Below variable template is part of my project and I have removed some of the unnecessary code so instead of template use whatever fits your situation */
      // template.save(); //save the model as you have changed it
      send(res, 200, file);
    })
  });

  // const {contentType} = await json(req) // we are requiring the ContenType from the request
  // const s3key = `${generateUUID()}.${contentType.split('/').pop()}` // this works for png, jpg, pdf, ...
  // console.log(contentType)
  // const params = {
  //   Bucket: config.bucket_name,
  //   Fields: {
  //     key: s3key
  //   },
  //   Expires: 60 * 10, // 10 min
  //   Conditions: [
  //     {
  //       'bucket': config.bucket_name
  //     },
  //     {
  //       'key': s3key // our generated key
  //     },
  //     {
  //       'acl': 'private' // private bucket
  //     },
  //     {
  //       'Content-Type': contentType
  //     },
  //     ['content-length-range', 8000, 8000000] // from 1KB to 1 MB
  //   ]
  // }

  // let signedPost = await s3.createPresignedPost(params)
  // signedPost = Object.assign(signedPost,
  //   {
  //     'Content-Type': contentType,
  //     'acl': 'private'
  //   }
  // )
  // res.status(200).json(signedPost)
}

module.exports = {
  postS3
}