import cors from 'cors'
import { json } from 'express'
import session from 'express-session'
import passport from 'passport'
import envConfig from './envConfig.js'
import routerConfig from './routerConfig.js'

export default (app) => {
  app.use(
    cors({
      origin: envConfig.corsOrigin,
      credentials: true,
    })
  )
  app.use(json())
  app.use(
    session({
      secret: envConfig.secretKey,
      resave: false,
      saveUninitialized: false,
    })
  )
  app.use(passport.initialize())
  app.use(passport.session())
  app.use('/api', routerConfig)
}
