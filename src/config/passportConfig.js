import passport from 'passport'
import { Strategy } from 'passport-google-oauth20'
import envConfig from './envConfig.js'

export default () => {
  passport.use(
    new Strategy(
      {
        clientID: envConfig.googleClientId,
        clientSecret: envConfig.googleClientSecret,
        callbackURL: '/api/passport/authorized',
      },
      (accessToken, refreshToken, profile, done) => {
        done(null, profile)
      }
    )
  )

  passport.serializeUser((user, done) => {
    done(null, user)
  })

  passport.deserializeUser((obj, done) => {
    done(null, obj)
  })
}
