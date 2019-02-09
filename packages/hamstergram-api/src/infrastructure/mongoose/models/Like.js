const { Schema } = require('mongoose')
const BaseModel = require('./BaseModel')

const like = Object.assign(BaseModel, {
  hamster: { type: Schema.Types.ObjectId, ref: 'Hamster', required: true }
})

module.exports = new Schema(like)
