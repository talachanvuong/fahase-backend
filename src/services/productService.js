import Product from '../models/Product.js'

const getAllByCategory = async (category) => {
  return await Product.find({ category }).select('title price thumbnail')
}

const existByTitle = async (title) => {
  return await Product.exists({ title })
}

const add = async (data) => {
  const product = new Product(data)
  await product.save()
}

const getById = async (_id) => {
  return await Product.findOne({ _id })
    .select('title price thumbnail description isDiscontinued')
    .populate('category')
}

const getRawById = async (_id) => {
  return await Product.findOne({ _id })
}

const update = async (product, data) => {
  Object.assign(product, data)
  await product.save()
}

export default {
  getAllByCategory,
  existByTitle,
  add,
  getById,
  getRawById,
  update,
}
