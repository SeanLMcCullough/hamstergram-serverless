const { Schema } = require('mongoose')
const BaseModel = require('./BaseModel')

const like = Object.assign(BaseModel, {})

module.exports = new Schema(like)
