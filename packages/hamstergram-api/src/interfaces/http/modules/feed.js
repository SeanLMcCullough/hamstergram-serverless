const Status = require('http-status')
const { Router } = require('express')
const { compose } = require('ramda')
const { clamp } = require('lodash')

const container = require('src/container')
const postRepository = require('src/infrastructure/repositories/post')
const { get } = require('src/app/feed')

module.exports = () => {
  const router = Router()
  const { logger, auth, database: { models }, response: { Success, Fail } } = container.cradle

  // Compose models against repositories to provide application use-cases
  const postModel = models.Post
  const postsUseCase = compose(postRepository)(postModel)

  // Build use cases for http verbs
  const getUseCase = get({ postRepository: postsUseCase })

  // Enable auth
  router.use(auth.authenticate())

  router.get('/', async (req, res) => {
    try {
      let data = await getUseCase.feed({
        lastId: req.query['last-id'],
        pageSize: clamp(Number(req.query['page-size']) || 10, 1, 25)
      })
      res
        .status(Status.OK)
        .json(Success(data))
    } catch (e) {
      logger.error(e)
      res
        .status(Status.BAD_REQUEST)
        .json(Fail(e.message))
    }
  })

  return router
}
