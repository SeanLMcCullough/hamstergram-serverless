const Status = require('http-status')
const { Router } = require('express')

const container = require('src/container')

module.exports = () => {
  const router = Router()
  const { response: { Success, Fail } } = container.cradle

  router.put('/', (req, res) => {
    res
      .status(Status.OK)
      .json(Success(Object.assign({
          _id: "TODO",
          createdAt: (new Date()).toISOString(),
          updatedAt: (new Date()).toISOString()
        }, req.body)))
  })

  router.post('/:id/like', (req, res) => {
    res
      .status(Status.OK)
      .json(Success({}))
  })

  return router
}
