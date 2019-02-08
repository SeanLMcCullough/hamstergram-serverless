module.exports = {
  version: process.env.APP_VERSION,
  port: process.env.PORT || 3000,
  logging: {
    maxsize: 100 * 1024, // 100mb
    maxFiles: 2,
    colorize: false
  },
  database: {
    uri: process.env.DATABASE_URI_TEST,
    username: process.env.DATABASE_USERNAME_TEST,
    password: process.env.DATABASE_PASSWORD_TEST
  },
  http: {
    cors: (process.env.CORS || '').split(',')
  },
  googleAuth: {
    clientId: null,
    clientSecret: null
  }
}
