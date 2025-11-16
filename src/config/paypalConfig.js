import { Client, Environment } from '@paypal/paypal-server-sdk'
import envConfig from './envConfig.js'

const client = new Client({
  clientCredentialsAuthCredentials: {
    oAuthClientId: envConfig.paypalClientId,
    oAuthClientSecret: envConfig.paypalClientSecret,
  },
  timeout: 0,
  environment: Environment.Sandbox,
})

export default client
