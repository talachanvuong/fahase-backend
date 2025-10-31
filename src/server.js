import express from 'express'
import { createServer } from 'http'
import apiConfig from './config/apiConfig.js'
import dbConfig from './config/dbConfig.js'
import envConfig from './config/envConfig.js'
import passportConfig from './config/passportConfig.js'

const app = express()
apiConfig(app)
dbConfig()
passportConfig()

const server = createServer(app)
server.listen(envConfig.serverPort)
