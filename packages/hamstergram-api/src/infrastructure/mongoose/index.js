const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')

//
module.exports = ({ databaseConfig }) => {

  // Connect to mongo instance using provided databaseConfig.
  mongoose.connect(databaseConfig.uri, {
    useNewUrlParser: true,
    user: databaseConfig.username,
    pass: databaseConfig.password
  })

  const db = {
    mongoose, // Mongoose instance
    models: {} // Database models
  }

  // Load in all database models and associate to mongoose from provided basePath/models
  const dir = path.join(__dirname, './models')
  fs.readdirSync(dir)
    .forEach(file => {
      const modelDir = path.join(dir, file)
      const modelName = file.split('.')[0]
      const imported = require(modelDir)
      if (imported instanceof mongoose.Schema) {
        const model = mongoose.model(modelName, imported)
        db.models[modelName] = model
      }
    })

  return db
}
