const { Post } = require('src/domain/post')
const { Like } = require('src/domain/like')

module.exports = ({ postRepository }) => {

  const create = async ({ body, user }) => {
    const post = new Post(Object.assign(body, {
      hamster: user._id
    }))
    const doc = await postRepository.save(post)
    return doc
      .populate('hamster')
      .execPopulate()
  }

  // Likes a post with the provided post (id)
  const like = async ({ post, user }) => {
    const targetPost = await postRepository.findById(post)
    const like = new Like({ post, hamster: user._id })
    targetPost.likes.push(like)
    return targetPost.save()
  }

  return {
    create,
    like
  }
}
