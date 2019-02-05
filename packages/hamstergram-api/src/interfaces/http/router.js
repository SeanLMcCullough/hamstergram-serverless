const statusMonitor = require('express-status-monitor')
const cors = require('cors')
const bodyParser = require('body-parser')
const compression = require('compression')
const { Router } = require('express')
const { partialRight } = require('ramda')

const controller = require('./create-controller')
const httpLogger = require('./middlewares/http-logger')
const errorHandler = require('./middlewares/error-handler')

module.exports = ({ config, logger }) => {
  const router = Router()

  router.use(partialRight(errorHandler, [logger, config]))

  if (config.env === 'development') {
    router.use(statusMonitor())
  }

  if (config.env !== 'test') {
    router.use(httpLogger(logger))
  }

  router.get('/', (req, res) => {
    res
      .status(200)
      .json({
        healthy: true
      })
  })

  const apiRouter = Router()

  apiRouter
    .use(cors({
      origin: ['http://localhost:3000'],
      methods: ['POST'],
      allowedHeaders: ['Content-Type', 'Authorization']
    }))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: false }))
    .use(compression())

  router.use(`/${config.version}`, apiRouter)

  apiRouter.use('/feed', controller('feed'))
  apiRouter.use('/post', controller('post'))

  return router
}
