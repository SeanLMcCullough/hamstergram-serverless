const passport = require('passport')
const MockStrategy = require('passport-mock-strategy');
const { Strategy: GoogleStrategy } = require('passport-google-token')
const { compose } = require('ramda')

const hamsterRepository = require('src/infrastructure/repositories/hamster')

module.exports = ({ config, database }) => {

  const hamsterModel = database.models.Hamster
  const hamstersUseCase = compose(hamsterRepository)(hamsterModel)

  const mapToHamster = async (profile) => {
    let hamster = await hamstersUseCase.findOne({
      providerId: profile.id,
      provider: profile.provider,
      active: true
    })

    if (hamster) return hamster;

    return hamstersUseCase.save({
      providerId: profile.id,
      provider: profile.provider,
      name: profile.name,
      displayName: profile.displayName
    })
  }

  let strategy

  if (config.env === 'test') {
    strategy = new MockStrategy({
      name: 'mock',
      user: {
        id: 'test',
        provider: 'system',
        name: 'John Smith',
        displayName: 'John Smith',
        birthday: null,
        relationship: null,
        isPerson: null,
        isPlusUser: null,
        placesLived: [],
        language: null,
        emails: [],
        gender: null,
        picture: null
      }
    }, async (profile, done) => {
      try {
        let hamster = await mapToHamster(profile)
        done(null, hamster)
      } catch (e) {
        done(e)
      }
    })

  } else {
    strategy = new GoogleStrategy({
      clientID: config.googleAuth.clientId,
      clientSecret: config.googleAuth.clientSecret
    }, async (accessToken, refreshToken, profile, done) => {
      try {
        let hamster = await mapToHamster(profile)
        done(null, hamster)
      } catch (e) {
        done(e)
      }
    })
  }

  passport.use(strategy)

  passport.serializeUser(function (user, done) {
    done(null, user)
  })

  passport.deserializeUser(function (user, done) {
    done(null, user)
  })

  return {
    initialize: () => {
      return passport.initialize()
    },
    authenticate: () => {
      return config.env === 'test'
        ? passport.authenticate('mock')
        : passport.authenticate('google-token')
    }
  }
}
