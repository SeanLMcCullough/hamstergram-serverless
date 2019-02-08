const t = require('tcomb')
const { compose } = require('ramda')
const { clean } = require('../helpers')

const Post = t.struct({
  _id: t.maybe(t.String),
  createdAt: t.maybe(t.Date),
  updatedAt: t.maybe(t.Date),
  text: t.String
})

module.exports = compose(
  clean,
  Post
)
