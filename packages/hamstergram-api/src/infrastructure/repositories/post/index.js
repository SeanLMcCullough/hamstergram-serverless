const { toEntity } = require('./transform')


module.exports = (Post) => {

  const count = (...args) => Post.count(...args)

  const find = (...args) => Post.find(...args)

  const findById = (...args) => Post.findById(...args)

  const save = async (item) => {
    let post = new Post(item)
    return post.save()
  }

  return {
    count,
    find,
    findById,
    save
  }
}
