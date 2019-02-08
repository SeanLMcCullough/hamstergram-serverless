module.exports = {
  version: process.env.APP_VERSION,
  port: process.env.PORT || 3000,
  logging: {
    maxsize: 100 * 1024, // 100mb
    maxFiles: 2,
    colorize: false
  },
  database: {
    uri: process.env.DATABASE_URI_DEV,
    username: process.env.DATABASE_USERNAME_DEV,
    password: process.env.DATABASE_PASSWORD_DEV
  },
  http: {
    cors: (process.env.CORS || '').split(',')
  }
}
