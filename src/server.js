import express from 'express'
import { createServer } from 'http'
import apiConfig from './config/apiConfig.js'
import envConfig from './config/envConfig.js'

const app = express()
apiConfig(app)

const server = createServer(app)
server.listen(envConfig.serverPort)
