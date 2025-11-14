import bcrypt from 'bcrypt'
import Admin from '../models/Admin.js'

const create = async (data) => {
  const password = await bcrypt.hash(data.password, 10)

  const admin = new Admin({
    display_name: data.display_name,
    password,
  })

  await admin.save()
}

const existByDisplayName = async (display_name) => {
  return await Admin.exists({ display_name })
}

const getByDisplayName = async (display_name) => {
  return await Admin.findOne({ display_name })
}

const correctPassword = async (admin, password) => {
  return await bcrypt.compare(password, admin.password)
}

export default {
  create,
  existByDisplayName,
  getByDisplayName,
  correctPassword,
}
