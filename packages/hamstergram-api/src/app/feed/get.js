const { Types } = require('mongoose')

module.exports = ({ postRepository }) => {

  const feed = async ({ lastId, pageSize = 10 }) => {
    lastId = Types.ObjectId(lastId)

    let conditions = Object.assign({
      isActive: true,
    }, lastId && {
      _id: {
        $lt: lastId
      }
    })

    let items = await postRepository
      .find(conditions, null, {
        limit: pageSize,
        sort: {
          createdAt: -1
        }
      })
      .populate('hamster')

    return items
  }

  return {
    feed
  }
}
