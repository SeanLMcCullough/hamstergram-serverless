const {
  createContainer,
  asValue,
  asFunction
} = require('awilix')

const config = require('../config')
const logger = require('./infrastructure/logging/logger')
const app = require('./app')
const server = require('./interfaces/http/server')
const router = require('./interfaces/http/router')

const container = createContainer()

container
  .register({
    config: asValue(config),
    logger: asFunction(logger).singleton(),
    app: asFunction(app).singleton(),
    server: asFunction(server).singleton(),
    router: asFunction(router).singleton(),
  })

module.exports = container
