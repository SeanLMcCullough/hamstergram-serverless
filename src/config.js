const config = {
  Auth: {
    identityPoolId: process.env.VUE_APP_IDENTITY_POOL_ID,
    region: process.env.VUE_APP_REGION,
    userPoolId: process.env.VUE_APP_USER_POOL_ID,
    userPoolWebClientId: process.env.VUE_APP_USER_POOL_CLIENT_ID,
    cookieStorage: {
      domain: process.env.VUE_APP_DOMAIN
    }
  }
}

debugger
export default config
