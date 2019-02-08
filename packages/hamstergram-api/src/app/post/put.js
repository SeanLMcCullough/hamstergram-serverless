const { Post } = require('src/domain/post')
const { Like } = require('src/domain/like')

module.exports = ({ postRepository }) => {

  const create = async ({ body }) => {
    const post = new Post(body)
    return postRepository.save(post)
  }

  // Likes a post with the provided post (id)
  const like = async ({ post }) => {
    const targetPost = await postRepository.findById(post)
    const like = new Like({ post })
    targetPost.likes.push(like)
    return targetPost.save()
  }

  return {
    create,
    like
  }
}
