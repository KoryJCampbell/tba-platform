var cloudinary = require("cloudinary").v2; 
const connect = require("./db");
var multiparty = require('multiparty');
var cors = require('micro-cors')()
var util = require('util');
// if (!config.bucket_name) throw new Error('Please check your configuration!')

//Enter your credentials below                                              
cloudinary.config({
  cloud_name: "dzsf703vh", 
  api_key: "842217184658413", 
  api_secret: "7wGlIcHSM3iF64mY__8T0-Lllpk"                       
});

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
    console.log(filename)
    cloudinary.uploader.upload(filename,{ tags: "gotemps",resource_type: "auto" })
    .then(function(file) {
      console.log("Public id of the file is  " + file.public_id);
      console.log("Url of the file is  " + file.url);
      /* Below variable template is part of my project and I have removed some of the unnecessary code so instead of template use whatever fits your situation */
      // template.save(); //save the model as you have changed it
      send(res, 200, file);
    }).catch((err)=>{
      console.log(err)
    })
  });
}
module.exports = {
  postS3: cors(postS3)
}