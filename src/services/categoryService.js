import Category from '../models/Category.js'

const getAll = async () => {
  return await Category.find()
}

const getById = async (category_id) => {
  return await Category.findOne({ category_id })
}

const getByTitle = async (title) => {
  return await Category.findOne({ title })
}

const add = async (data) => {
  const category = new Category(data)
  await category.save()
}

const remove = async (category_id) => {
  await Category.deleteOne({ category_id })
}

export default {
  getAll,
  getById,
  getByTitle,
  add,
  remove,
}
