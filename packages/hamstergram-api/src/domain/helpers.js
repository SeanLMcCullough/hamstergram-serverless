const { complement, compose, isNil, pickBy } = require('ramda')

const clean = entity => pickBy(compose(complement(isNil)), entity)

module.exports = {
  clean
}
