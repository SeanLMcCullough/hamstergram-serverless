const { toEntity } = require('./transform')


module.exports = (Hamster) => {

  const findOne = async (...args) => Hamster.findOne(...args)

  const save = async (item) => {
    let hamster = new Hamster(item)
    return hamster.save()
  }

  return {
    findOne,
    save
  }
}
