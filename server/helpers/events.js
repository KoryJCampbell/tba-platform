const connect = require("./db");

module.exports = async (req, res) => {
  // Set caching headers to serve stale content (if over a second old)
  // while revalidating fresh content in the background
  res.setHeader('cache-control', 's-maxage=1 maxage=0, stale-while-revalidate')

  // Connect to MongoDB and get the database
  const database = await connect()

  // Select the "tba" collection from the database
  const collection = await database.collection('tba')

  // Select the users collection from the database
  const event = await collection.find({}).toArray()

  // Respond with a JSON string of all users in the collection
  res.status(200).json(event)
}
