const { toEntity } = require('./transform')


module.exports = (Post) => {

  const count = async (...args) => Post.count(...args)

  const find = async (...args) => Post.find(...args)

  const findById = async (...args) => Post.findById(...args)

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
