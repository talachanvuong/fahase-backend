import cartSchema from '../schemas/cartSchema.js'
import cartService from '../services/cartService.js'
import boughtService from '../services/boughtService.js'
import productService from '../services/productService.js'
import { STATUS_CODE } from '../utils/constantUtils.js'
import { sendResponse } from '../utils/responseUtils.js'

const get = async (req, res) => {
  const { _id } = req.user
  const cart = await cartService.get(_id)
  return sendResponse(res, STATUS_CODE.SUCCESS, cart)
}

const add = async (req, res) => {
  const { error, value } = cartSchema.add.validate(req.body)

  if (error) {
    return sendResponse(res, STATUS_CODE.BAD_REQUEST, error.message)
  }

  const { _id: user } = req.user
  const { product } = value

  if (!(await productService.existById(product))) {
    return sendResponse(res, STATUS_CODE.NOT_FOUND, 'Sản phẩm không tồn tại')
  }

  if (await boughtService.isBought(user, product)) {
    return sendResponse(res, STATUS_CODE.BAD_REQUEST, 'Sản phẩm đã được mua')
  }

  if (await cartService.containProduct(user, product)) {
    return sendResponse(res, STATUS_CODE.BAD_REQUEST, 'Sản phẩm đã trong giỏ')
  }

  await cartService.add({ user, product })

  return sendResponse(res, STATUS_CODE.CREATED, 'Thêm vào giỏ thành công')
}

const remove = async (req, res) => {
  const { error, value } = cartSchema.remove.validate(req.params)

  if (error) {
    return sendResponse(res, STATUS_CODE.BAD_REQUEST, error.message)
  }

  const { _id: user } = req.user
  const { product } = value

  if (!(await productService.existById(product))) {
    return sendResponse(res, STATUS_CODE.NOT_FOUND, 'Sản phẩm không tồn tại')
  }

  if (!(await cartService.containProduct(user, product))) {
    return sendResponse(
      res,
      STATUS_CODE.BAD_REQUEST,
      'Sản phẩm không trong giỏ'
    )
  }

  await cartService.remove(user, product)

  return sendResponse(res, STATUS_CODE.SUCCESS, 'Xóa khỏi giỏ thành công')
}

export default {
  get,
  add,
  remove,
}
