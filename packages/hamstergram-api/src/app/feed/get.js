module.exports = ({ postRepository }) => {

  const feed = async ({ lastId, pageSize = 10 }) => {
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

    return items
  }

  return {
    feed
  }
}
