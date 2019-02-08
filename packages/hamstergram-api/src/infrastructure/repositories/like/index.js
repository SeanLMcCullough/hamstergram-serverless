const { toEntity } = require('./transform')


module.exports = (Like) => {

  const save = async (item) => {
    let like = new Like(item)
    return like.save()
  }

  return {
    save
  }
}
