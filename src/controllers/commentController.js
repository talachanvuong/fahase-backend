import commentSchema from '../schemas/commentSchema.js'
import commentService from '../services/commentService.js'
import productService from '../services/productService.js'
import boughtService from '../services/boughtService.js'
import { STATUS_CODE } from '../utils/constantUtils.js'
import { sendResponse } from '../utils/responseUtils.js'

const add = async (req, res) => {
  const { error, value } = commentSchema.add.validate(req.body)

  if (error) {
    return sendResponse(res, STATUS_CODE.BAD_REQUEST, error.message)
  }

  const { _id: user } = req.user
  const { content, product } = value

  if (!(await productService.existById(product))) {
    return sendResponse(res, STATUS_CODE.BAD_REQUEST, 'Sản phẩm không tồn tại')
  }

  if (!(await boughtService.isBought(user, product))) {
    return sendResponse(res, STATUS_CODE.BAD_REQUEST, 'Sản phẩm chưa được mua')
  }

  await commentService.add({ content, user, product })

  return sendResponse(res, STATUS_CODE.CREATED, 'Thêm bình luận thành công')
}

const getAllByProduct = async (req, res) => {
  const { error, value } = commentSchema.getAllByProduct.validate(req.params)

  if (error) {
    return sendResponse(res, STATUS_CODE.BAD_REQUEST, error.message)
  }

  const { product } = value

  if (!(await productService.existById(product))) {
    return sendResponse(res, STATUS_CODE.BAD_REQUEST, 'Sản phẩm không tồn tại')
  }

  const comments = await commentService.getAllByProduct(product)

  return sendResponse(res, STATUS_CODE.SUCCESS, comments)
}

export default {
  add,
  getAllByProduct,
}
