const Status = require('http-status')
const { Router } = require('express')

module.exports = () => {
  const router = Router()

  router.get('/', (req, res) => {
    res
      .status(Status.OK)
      .json({
        items: [],
        totalItems: 0
      })
  })

  return router
}
