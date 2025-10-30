import passport from 'passport'
import envConfig from '../config/envConfig.js'

const login = passport.authenticate('google', {
  scope: ['profile', 'email'],
})

const authorized = [
  passport.authenticate('google', {
    failureRedirect: `${envConfig.corsOrigin}/login`,
  }),
  (req, res) => {
    res.redirect(envConfig.corsOrigin)
  },
]

export default {
  login,
  authorized,
}
