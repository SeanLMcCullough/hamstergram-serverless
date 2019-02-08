const { Schema } = require('mongoose')
const BaseModel = require('./BaseModel')

const like = Object.assign(BaseModel, {
  post: { type: Schema.Types.ObjectId, ref: 'Post' }
})

module.exports = new Schema(like)
