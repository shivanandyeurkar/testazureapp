require('dotenv').config()
const express = require('express')
const serverless = require('serverless-http')
const app = express()
app.set('etag', false)

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})

var cors = require('cors')
const port = 5080

app.use(cors())

app.use(express.json())
const api = require('./routes/routes')
app.use('/api', api)

app.get('/', (req, res) => {
  res.json('All good, start fetching!!')
})

app.use(function (err, req, res, next) {
  // error handling logic
  console.error(err)
  res.status(500)
  res.json({ error: err.message })
})

app.listen(port, () => {
  console.log(`App listening at ${port}`)
})

// module.exports.handler = serverless(app)
