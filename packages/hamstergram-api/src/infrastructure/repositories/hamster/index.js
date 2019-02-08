const { toEntity } = require('./transform')


module.exports = (Hamster) => {

  const findOne = (...args) => Hamster.findOne(...args)

  const save = (item) => {
    let hamster = new Hamster(item)
    return hamster.save()
  }

  return {
    findOne,
    save
  }
}
