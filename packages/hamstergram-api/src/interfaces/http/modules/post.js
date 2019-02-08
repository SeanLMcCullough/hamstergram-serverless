const Status = require('http-status')
const { Router } = require('express')
const { compose } = require('ramda')

const container = require('src/container')
const postRepository = require('src/infrastructure/repositories/post')
const { put } = require('src/app/post')

module.exports = () => {
  const router = Router()
  const { logger, auth, database: { models }, response: { Success, Fail } } = container.cradle

  // Compose models against repositories to provide application use-cases
  const postModel = models.Post
  const postsUseCase = compose(postRepository)(postModel)

  // Build use cases for http verbs
  const putUseCase = put({ postRepository: postsUseCase })

  // Enable auth
  router.use(auth.authenticate())

  router.put('/', async (req, res) => {
    try {
      let result = await putUseCase.create({ body: req.body, user: req.user })
      res
        .status(Status.OK)
        .json(Success(result))
    } catch (e) {
      logger.error(e)
      res
        .status(Status.BAD_REQUEST)
        .json(Fail(e.message))
    }
  })

  router.put('/:id/like', async (req, res) => {
    try {
      let result = await putUseCase.like({ post: req.params.id, user: req.user })
      res
        .status(Status.OK)
        .json(Success(result))
    } catch (e) {
      logger.error(e)
      res
        .status(Status.BAD_REQUEST)
        .json(Fail(e.message))
    }
  })

  return router
}
