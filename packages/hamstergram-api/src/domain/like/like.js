const t = require('tcomb')
const { compose } = require('ramda')
const { clean } = require('../helpers')

const Like = t.struct({
  post: t.String
})

module.exports = compose(
  clean,
  Like
)
