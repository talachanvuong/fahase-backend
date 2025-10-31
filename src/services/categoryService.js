import Category from '../models/Category.js'

const getAll = async () => {
  return await Category.find()
}

const getById = async (_id) => {
  return await Category.findOne({ _id })
}

const getByTitle = async (title) => {
  return await Category.findOne({ title })
}

const add = async (data) => {
  const category = new Category(data)
  await category.save()
}

const remove = async (_id) => {
  await Category.deleteOne({ _id })
}

export default {
  getAll,
  getById,
  getByTitle,
  add,
  remove,
}
