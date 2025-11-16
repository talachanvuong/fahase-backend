import Comment from '../models/Comment.js'
import { convertTime } from '../utils/convertUtils.js'

const add = async (data) => {
  const comment = new Comment(data)
  await comment.save()
}

const getAllByProduct = async (product) => {
  const comments = await Comment.find({ product })
    .select('-product')
    .populate('user', 'display_name photo_url')
    .sort('-created_at')

  return comments.map((comment) => ({
    _id: comment._id,
    content: comment.content,
    user: comment.user,
    created_at: convertTime(comment.created_at),
  }))
}

export default {
  add,
  getAllByProduct,
}
