import mongoose from 'mongoose'

const adminSchema = new mongoose.Schema(
  {
    display_name: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
)

const Admin = mongoose.model('Admin', adminSchema)

export default Admin
