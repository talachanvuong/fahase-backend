import express from 'express'
import { createServer } from 'http'
import apiConfig from './config/apiConfig.js'
import envConfig from './config/envConfig.js'
import passportConfig from './config/passportConfig.js'

const app = express()
apiConfig(app)
passportConfig()

const server = createServer(app)
server.listen(envConfig.serverPort)
