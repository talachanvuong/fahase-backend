import passport from 'passport'
import { Strategy } from 'passport-google-oauth20'
import userService from '../services/userService.js'
import envConfig from './envConfig.js'

export default () => {
  passport.use(
    new Strategy(
      {
        clientID: envConfig.googleClientId,
        clientSecret: envConfig.googleClientSecret,
        callbackURL: '/api/passport/authorized',
      },
      async (accessToken, refreshToken, profile, done) => {
        const { name, email, picture } = profile._json

        const data = {
          display_name: name,
          email: email,
          photo_url: picture,
        }

        const user = await userService.getByEmail(email)

        if (!user) {
          await userService.create(data)
        } else {
          await userService.update(user, data)
        }

        done(null, data)
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
