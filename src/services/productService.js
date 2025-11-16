import Product from '../models/Product.js'

const getAllByCategory = async (category) => {
  const products = await Product.find({ category }).select('title price')

  return products.map((product) => ({
    _id: product._id,
    title: product.title,
    price: product.price,
    thumbnail: `/api/blob/thumbnailPublic/${product._id}`,
  }))
}

const existById = async (_id) => {
  return await Product.exists({ _id })
}

const existByTitle = async (title) => {
  return await Product.exists({ title })
}

const add = async (data) => {
  const product = new Product(data)
  await product.save()
}

const getById = async (_id) => {
  const product = await Product.findOne({ _id })
    .select('title price description isDiscontinued')
    .populate('category')

  if (!product) {
    return null
  }

  return {
    _id: product._id,
    title: product.title,
    price: product.price,
    thumbnail: `/api/blob/thumbnailPublic/${product._id}`,
    description: product.description,
    isDiscontinued: product.isDiscontinued,
    category: product.category,
  }
}

const getRawById = async (_id) => {
  return await Product.findOne({ _id })
}

const update = async (product, data) => {
  Object.assign(product, data)
  await product.save()
}

const find = async (keyword) => {
  const products = await Product.find({
    title: {
      $regex: keyword,
      $options: 'i',
    },
  }).select('title price')

  return products.map((product) => ({
    _id: product._id,
    title: product.title,
    price: product.price,
    thumbnail: `/api/blob/thumbnailPublic/${product._id}`,
  }))
}

const getAllByAdmin = async () => {
  const products = await Product.find().populate('category')

  return products.map((product) => ({
    _id: product._id,
    title: product.title,
    price: product.price,
    thumbnail: `/api/blob/thumbnailPublic/${product._id}`,
    description: product.description,
    file: `/api/blob/fileAdmin/${product._id}`,
    isDiscontinued: product.isDiscontinued,
    category: product.category,
  }))
}

export default {
  getAllByCategory,
  existById,
  existByTitle,
  add,
  getById,
  getRawById,
  update,
  find,
  getAllByAdmin,
}
