const { assoc } = require('ramda')

module.exports = ({ config }) => {
  const defaultResponse = () => {
    return {
      version: config.version,
      date: new Date().toISOString()
    }
  }

  const Success = (data) => {
    return assoc(
      'data',
      data,
      defaultResponse(true)
    )
  }

  const Fail = (err) => {
    return assoc(
      'error',
      err,
      defaultResponse()
    )
  }

  return {
    Success,
    Fail
  }
}
