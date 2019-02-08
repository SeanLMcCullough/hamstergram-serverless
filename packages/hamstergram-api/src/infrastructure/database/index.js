const mongoose = require('src/infrastructure/mongoose')

module.exports = ({ config, logger }) => {
  if (!config.database) {
    logger.error('No database config provided. Database disabled.')
    return false
  }

  // Proxy config to mongoose infra
  return mongoose({ databaseConfig: config.database })
}
