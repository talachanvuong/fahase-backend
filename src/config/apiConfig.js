import cp from 'cookie-parser'
import cors from 'cors'
import { json } from 'express'
import envConfig from './envConfig.js'
import routerConfig from './routerConfig.js'

export default (app) => {
  app.use(cp())
  app.use(
    cors({
      origin: envConfig.corsOrigin,
      credentials: true,
    })
  )
  app.use(json())
  app.use('/api', routerConfig)
}
