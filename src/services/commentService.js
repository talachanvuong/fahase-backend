import Comment from '../models/Comment.js'

const add = async (data) => {
  const comment = new Comment(data)
  await comment.save()
}

const getAllByProduct = async (product) => {
  return await Comment.find({ product }).select('-product').populate(
    'user',
    'display_name photo_url'
  )
}

export default {
  add,
  getAllByProduct,
}
