// Local dependencies
const { handleErrors } = require('../helpers/error')
const { postS3 } = require('../helpers/upload')
console.log(process.env)
module.exports = async (req) =>{
    console.log(req.url)
    handleErrors(postS3)
}