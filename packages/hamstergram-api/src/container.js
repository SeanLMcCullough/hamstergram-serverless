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
const database = require('./infrastructure/database')
const response = require('./infrastructure/http/response')
const auth = require('./interfaces/http/auth')

const container = createContainer()

container
  .register({
    config: asValue(config),
    logger: asFunction(logger).singleton(),
    app: asFunction(app).singleton(),
    server: asFunction(server).singleton(),
    router: asFunction(router).singleton(),
    database: asFunction(database).singleton(),
    response: asFunction(response).singleton(),
    auth: asFunction(auth).singleton()
  })

module.exports = container
