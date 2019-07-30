// Local dependencies
const { handleErrors } = require('../helpers/error')
const { getS3 } = require('../helpers/upload')

module.exports = handleErrors(getS3)