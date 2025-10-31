import User from '../models/User.js'

const create = async (data) => {
  const user = new User(data)
  await user.save()
}

const getByEmail = async (email) => {
  return await User.findOne({ email })
}

const update = async (user, data) => {
  Object.assign(user, data)
  await user.save()
}

export default {
  create,
  getByEmail,
  update,
}
