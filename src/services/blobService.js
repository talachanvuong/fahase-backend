import Product from '../models/Product.js'

const thumbnail = async (product) => {
  return await Product.findOne({ _id: product }).select('thumbnail')
}

export default {
  thumbnail,
}
