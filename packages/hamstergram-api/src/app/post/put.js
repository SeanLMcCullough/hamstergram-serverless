const { Post } = require('src/domain/post')
const { Like } = require('src/domain/like')

module.exports = ({ postRepository, likeRepository }) => {

  const create = async ({ body }) => {
    const post = new Post(body)
    return postRepository.save(post)
  }

  // Likes a post with the provided post (id)
  const like = async ({ post }) => {
    const like = new Like({ post })
    return likeRepository.save(like)
  }

  return {
    create,
    like
  }
}
