require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV , API_TOKEN} = require('./misc/config')
const errorHandler = require('./misc/error-handler')
const businessRouter = require('./router/businessRouter')
const app = express()
const logger = require('./misc/winston-logger')

function validateBearerToken(req, res, next) {
  const authToken = req.get('Authorization')
  logger.error(`Unauthorized request to path: ${req.path}`)
  console.log(authToken)
  console.log(API_TOKEN)

  if (!authToken || authToken.split(' ')[1] !== API_TOKEN) {
    return res.status(401).json({ error: 'Unauthorized request' })
  }
  console.log('abc')

  next()
}


app.use(morgan((NODE_ENV === 'production') ? 'tiny' : 'common', {
  skip: () => NODE_ENV === 'test'
}))
app.use(cors())
app.use(helmet())
app.use(validateBearerToken)

app.use('/',businessRouter)

app.get('/',  (req, res) => {
  res.send('Hello, world!')
})

app.use(errorHandler)

module.exports = app