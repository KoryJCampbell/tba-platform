const connect = require("./db");
const cors = require('micro-cors')()
const {createError, send, json} = require('micro')

const create = async (req, res) => {
  // Set caching headers to serve stale content (if over a second old)
  // while revalidating fresh content in the background
  res.setHeader('cache-control', 's-maxage=1 maxage=0, stale-while-revalidate')

  // Connect to MongoDB and get the database
  const database = await connect()

  // Select the "tba" collection from the database
  const collection = await database.collection('tba')
  console.log(req.body)
  const {event} = req.body

  // Respond with a JSON string of all users in the collection
  await collection.insertOne(event)

  send(res, 200, event)
}
module.exports = { create }