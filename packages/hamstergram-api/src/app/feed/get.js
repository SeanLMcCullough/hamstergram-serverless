module.exports = ({ postRepository }) => {

  const feed = async ({ offset = 0 }) => {
    return postRepository.find({ isActive: true }, null, {
      skip: offset,
      sort: {
        createdAt: -1
      }
    })
  }

  return {
    feed
  }
}
