const { Schema } = require('mongoose')
const BaseModel = require('./BaseModel')

const hamster = Object.assign(BaseModel, {
  providerId: String,
  provider: String,
  name: String,
  displayName: String
})

module.exports = new Schema(hamster)
