const t = require('tcomb')
const { compose } = require('ramda')
const { clean } = require('../helpers')

const Hamster = t.struct({
  providerId: t.String,
  provider: t.String,
  name: t.Object,
  displayName: t.maybe(t.String)
})

module.exports = compose(
  clean,
  Hamster
)
