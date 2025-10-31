import mongoose from 'mongoose'
import envConfig from './envConfig.js'

export default async () => {
  await mongoose.connect(envConfig.mongoUri)
}
