module.exports = ({ server }) => {
  return {
    async start () {
      await server.start()
      return
    }
  }
}
