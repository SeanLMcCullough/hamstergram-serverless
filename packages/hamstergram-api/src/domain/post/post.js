const t = require('tcomb')
const { compose } = require('ramda')
const { clean } = require('../helpers')

const Post = t.struct({
  text: t.String
})

module.exports = compose(
  clean,
  Post
)
