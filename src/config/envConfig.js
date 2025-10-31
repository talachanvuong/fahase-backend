import 'dotenv/config'

export default {
  serverPort: process.env.SERVER_PORT,
  corsOrigin: process.env.CORS_ORIGIN,
  secretKey: process.env.SECRET_KEY,
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  mongoUri: process.env.MONGO_URI,
}
