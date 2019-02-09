const Status = require('http-status')
const { Router } = require('express')
const { compose } = require('ramda')
const { clamp } = require('lodash')

const container = require('src/container')

module.exports = () => {
  const router = Router()
  const { logger, auth, response: { Success, Fail } } = container.cradle

  // Enable auth
  router.use(auth.authenticate())

  router.get('/', (req, res) => {
    if (req.user) {
      res
        .status(Status.OK)
        .json(Success(req.user))
      return
    }
    res
      .status(Status.BAD_REQUEST)
      .json(Fail('No user account'))
  })

  return router
}
