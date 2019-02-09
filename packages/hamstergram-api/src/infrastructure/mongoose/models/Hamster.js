const { Schema } = require('mongoose')
const BaseModel = require('./BaseModel')

const hamster = Object.assign(BaseModel, {
  providerId: String,
  provider: String,
  name: {
    givenName: String,
    familyName: String
  },
  displayName: String
})

module.exports = new Schema(hamster)
