const stripe = require('stripe')(process.env.STRIPE_SECRET_DEV);

module.exports = async (req, res) => {
  

  // Respond with a JSON string of all users in the collection
  res.status(200).json({})
}
