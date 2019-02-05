module.exports = {
  version: process.env.APP_VERSION,
  port: process.env.PORT || 3000,
  logging: {
    maxsize: 100 * 1024, // 100mb
    maxFiles: 2,
    colorize: false
  }
}
