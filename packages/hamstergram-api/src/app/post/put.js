const { Post } = require('src/domain/post')

module.exports = ({ postRepository }) => {

  const create = async ({ body }) => {
    const post = new Post(body)
    return postRepository.save(post)
  }

  return {
    create
  }
}
