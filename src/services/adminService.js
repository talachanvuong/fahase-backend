import bcrypt from 'bcrypt'
import Admin from '../models/Admin.js'
import Order from '../models/Order.js'

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

const getReport = async () => {
  const countOrders = async (state, days) => {
    const from = new Date()
    from.setHours(0, 0, 0, 0)
    from.setDate(from.getDate() - (days - 1))

    return await Order.countDocuments({
      state,
      created_at: { $gte: from },
    })
  }

  return {
    success: {
      today: await countOrders('Thành công', 1),
      threeDays: await countOrders('Thành công', 3),
      sevenDays: await countOrders('Thành công', 7),
      thirtyDays: await countOrders('Thành công', 30),
    },
    fail: {
      today: await countOrders('Thất bại', 1),
      threeDays: await countOrders('Thất bại', 3),
      sevenDays: await countOrders('Thất bại', 7),
      thirtyDays: await countOrders('Thất bại', 30),
    },
  }
}

export default {
  create,
  existByDisplayName,
  getByDisplayName,
  correctPassword,
  getReport,
}
