const { Schema } = require('mongoose')
const BaseModel = require('./BaseModel')
const Like = require('./Like')

const post = Object.assign(BaseModel, {
  text: String,
  likes: [Like]
})

module.exports = new Schema(post)
