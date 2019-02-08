const { Schema } = require('mongoose')
const BaseModel = require('./BaseModel')

const post = Object.assign(BaseModel, {
  text: String
})

module.exports = new Schema(post)
