import Product from '../models/Product.js'

const thumbnailPublic = async (product) => {
  return await Product.findOne({ _id: product }).select('thumbnail')
}

export default {
  thumbnailPublic,
}
