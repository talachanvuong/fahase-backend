import Category from '../models/Category.js'
import Product from '../models/Product.js'

const getAll = async () => {
  return await Category.find()
}

const getById = async (_id) => {
  return await Category.findOne({ _id })
}

const existById = async (_id) => {
  return await Category.exists({ _id })
}

const existByTitle = async (title) => {
  return await Category.exists({ title })
}

const add = async (data) => {
  const category = new Category(data)
  await category.save()
}

const remove = async (_id) => {
  await Category.deleteOne({ _id })
}

const containProduct = async (_id) => {
  return await Product.exists({ category: _id })
}

export default {
  getAll,
  getById,
  existById,
  existByTitle,
  add,
  remove,
  containProduct,
}
