const express = require('express')


module.exports = ({ config, router, logger }) => {
  const app = express()

  app.disable('x-powered-by')
  app.use(router)

  return {
    app,
    async start () {
      const http = app.listen(config.port, '0.0.0.0', () => {
        const { port } = http.address()
        logger.info(`Listening on port ${port}`)
      })
    }
  }
}
