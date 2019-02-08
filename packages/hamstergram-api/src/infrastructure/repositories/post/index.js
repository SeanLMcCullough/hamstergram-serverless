const { toEntity } = require('./transform')


module.exports = (model) => {

  const find = async (...args) => model.find(...args)

  return {
    find
  }
}
