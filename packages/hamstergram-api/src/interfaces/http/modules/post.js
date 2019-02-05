const Status = require('http-status')
const { Router } = require('express')

module.exports = () => {
  const router = Router()

  router.put('/', (req, res) => {
    res
      .status(Status.OK)
      .json(Object.assign({
          id: "TODO",
          createdAt: (new Date()).toISOString(),
          updatedAt: (new Date()).toISOString()
        }, req.body))
  })

  router.post('/:id/like', (req, res) => {
    res
      .status(Status.OK)
      .json({})
  })

  return router
}
