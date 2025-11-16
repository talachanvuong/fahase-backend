import Order from '../models/Order.js'
import OrderItem from '../models/OrderItem.js'
import Product from '../models/Product.js'
import { convertTime } from '../utils/convertUtils.js'

const create = async (user, paypalOrder, products) => {
  const order = new Order({ paypalOrder, user })
  await order.save()

  const productItems = await Promise.all(
    products.map(async (product) => {
      const productItem = await Product.findOne({ _id: product }).select(
        '-_id title price thumbnail file'
      )

      return {
        title: productItem.title,
        price: productItem.price,
        thumbnail: productItem.thumbnail,
        file: productItem.file,
        order: order._id,
        product,
      }
    })
  )

  await Promise.all(
    productItems.map(async (productItem) => {
      const orderItem = new OrderItem(productItem)
      await orderItem.save()
    })
  )
}

const getByPayPalOrder = async (user, paypalOrder) => {
  return await Order.findOne({ paypalOrder, user })
}

const update = async (order, state) => {
  order.state = state
  await order.save()
}

const getOrderItemsById = async (_id) => {
  return await OrderItem.find({ order: _id })
}

const getAllByUser = async (user) => {
  const orders = await Order.find({ user })
    .select('state created_at')
    .sort('-created_at')

  return orders.map((order) => ({
    _id: order._id,
    state: order.state,
    created_at: convertTime(order.created_at),
  }))
}

const getAllByAdmin = async () => {
  const orders = await Order.find()
    .select('state user created_at')
    .populate('user')
    .sort('-created_at')

  return orders.map((order) => ({
    _id: order._id,
    state: order.state,
    user: order.user,
    created_at: convertTime(order.created_at),
  }))
}

export default {
  create,
  getByPayPalOrder,
  update,
  getOrderItemsById,
  getAllByUser,
  getAllByAdmin,
}
