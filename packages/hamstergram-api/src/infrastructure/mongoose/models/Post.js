const { Schema } = require('mongoose')
const BaseModel = require('./BaseModel')
const Like = require('./Like')

const post = Object.assign(BaseModel, {
  text: String,
  hamster: { type: Schema.Types.ObjectId, ref: 'Hamster', required: true },
  likes: [Like]
})

module.exports = new Schema(post)
