const Status = require('http-status')
const { Router } = require('express')
const { compose } = require('ramda')

const container = require('src/container')
const postRepository = require('src/infrastructure/repositories/post')
const { get } = require('src/app/feed')

module.exports = () => {
  const router = Router()
  const { logger, database: { models }, response: { Success, Fail } } = container.cradle

  // Compose models against repositories to provide application use-cases
  const postModel = models.Post
  const postsUseCase = compose(postRepository)(postModel)

  // Build use cases for http verbs
  const getUseCase = get({ postRepository: postsUseCase })

  router.get('/', async (req, res) => {
    try {
      let data = await getUseCase.feed({ offset: req.offset })
      res
        .status(Status.OK)
        .json(Success({
          items: data,
          totalItems: 0
        }))
    } catch (e) {
      logger.error(e)
      res
        .status(Status.INTERNAL_SERVER_ERROR)
        .json(Fail(e.message))
    }
  })

  return router
}
