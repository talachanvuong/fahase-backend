import OrderItem from '../models/OrderItem.js'
import Product from '../models/Product.js'

const thumbnailPublic = async (product) => {
  return await Product.findOne({ _id: product }).select('thumbnail')
}

const fileAdmin = async (product) => {
  return await Product.findOne({ _id: product }).select('file')
}

const thumbnailBought = async (orderItem) => {
  return await OrderItem.findOne({ _id: orderItem }).select('thumbnail')
}

const fileBought = async (orderItem) => {
  return await OrderItem.findOne({ _id: orderItem }).select('file')
}

const thumbnailBoughtAdmin = async (orderItem) => {
  return await OrderItem.findOne({ _id: orderItem }).select('thumbnail')
}

const fileBoughtAdmin = async (orderItem) => {
  return await OrderItem.findOne({ _id: orderItem }).select('file')
}

export default {
  thumbnailPublic,
  fileAdmin,
  thumbnailBought,
  fileBought,
  thumbnailBoughtAdmin,
  fileBoughtAdmin,
}
