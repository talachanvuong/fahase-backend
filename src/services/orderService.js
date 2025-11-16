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

const getDetail = async (user, _id) => {
  const order = await Order.findOne({ _id, user }).select('state created_at')

  if (!order) {
    return null
  }

  const result = {
    _id: order._id,
    state: order.state,
    created_at: convertTime(order.created_at),
  }

  const orderItems = await OrderItem.find({ order: _id }).select('title price')

  result.orderItems = orderItems.map((orderItem) => {
    const filtered_orderItem = {
      _id: orderItem._id,
      title: orderItem.title,
      price: orderItem.price,
      thumbnail: `/api/blob/thumbnailBought/${orderItem._id}`,
    }

    if (result.state === 'Thành công') {
      filtered_orderItem.file = `/api/blob/fileBought/${orderItem._id}`
    }

    return filtered_orderItem
  })

  return result
}

const getDetailByAdmin = async (_id) => {
  const order = await Order.findOne({ _id })
    .select('state user created_at')
    .populate('user')

  if (!order) {
    return null
  }

  const result = {
    _id: order._id,
    state: order.state,
    user: order.user,
    created_at: convertTime(order.created_at),
  }

  const orderItems = await OrderItem.find({ order: _id }).select('title price')

  result.orderItems = orderItems.map((orderItem) => ({
    _id: orderItem._id,
    title: orderItem.title,
    price: orderItem.price,
    thumbnail: `/api/blob/thumbnailBoughtAdmin/${orderItem._id}`,
    file: `/api/blob/fileBoughtAdmin/${orderItem._id}`,
  }))

  return result
}

const getOrderItem = async (orderItem) => {
  return await OrderItem.findOne({ _id: orderItem }).select('product')
}

export default {
  create,
  getByPayPalOrder,
  update,
  getOrderItemsById,
  getAllByUser,
  getAllByAdmin,
  getDetail,
  getDetailByAdmin,
  getOrderItem,
}
