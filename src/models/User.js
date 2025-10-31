import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    display_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    photo_url: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
  },
  { versionKey: false }
)

const User = mongoose.model('User', userSchema)

export default User
