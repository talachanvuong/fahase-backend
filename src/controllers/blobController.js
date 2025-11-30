import blobSchema from '../schemas/blobSchema.js'
import blobService from '../services/blobService.js'
import boughtService from '../services/boughtService.js'
import orderService from '../services/orderService.js'
import { STATUS_CODE } from '../utils/constantUtils.js'
import { sendResponse, sendStream } from '../utils/responseUtils.js'

const thumbnailPublic = async (req, res) => {
  const { error, value } = blobSchema.thumbnailPublic.validate(req.params)

  if (error) {
    return sendResponse(res, STATUS_CODE.BAD_REQUEST, error.message)
  }

  const { product } = value
  const blob = await blobService.thumbnailPublic(product)

  if (!blob) {
    return sendResponse(res, STATUS_CODE.NOT_FOUND, 'Sản phẩm không tồn tại')
  }

  return sendStream(res, blob.thumbnail)
}

const fileAdmin = async (req, res) => {
  const { error, value } = blobSchema.fileAdmin.validate(req.params)

  if (error) {
    return sendResponse(res, STATUS_CODE.BAD_REQUEST, error.message)
  }

  const { product } = value
  const blob = await blobService.fileAdmin(product)

  if (!blob) {
    return sendResponse(res, STATUS_CODE.NOT_FOUND, 'Sản phẩm không tồn tại')
  }

  return sendStream(res, blob.file)
}

const thumbnailBought = async (req, res) => {
  const { error, value } = blobSchema.thumbnailBought.validate(req.params)

  if (error) {
    return sendResponse(res, STATUS_CODE.BAD_REQUEST, error.message)
  }

  const { orderItem } = value
  const blob = await blobService.thumbnailBought(orderItem)

  if (!blob) {
    return sendResponse(res, STATUS_CODE.NOT_FOUND, 'Chi tiết sản phẩm không tồn tại')
  }

  return sendStream(res, blob.thumbnail)
}

const fileBought = async (req, res) => {
  const { error, value } = blobSchema.fileBought.validate(req.params)

  if (error) {
    return sendResponse(res, STATUS_CODE.BAD_REQUEST, error.message)
  }

  const { _id: user } = req.user
  const { orderItem: orderItem_id } = value

  const orderItem = await orderService.getOrderItem(orderItem_id)

  if (!orderItem) {
    return sendResponse(
      res,
      STATUS_CODE.NOT_FOUND,
      'Chi tiết sản phẩm không tồn tại'
    )
  }

  if (!(await boughtService.isBought(user, orderItem.product))) {
    return sendResponse(res, STATUS_CODE.BAD_REQUEST, 'Sản phẩm chưa được mua')
  }

  const blob = await blobService.fileBought(orderItem_id)

  return sendStream(res, blob.file)
}

const fileBoughtAdmin = async (req, res) => {
  const { error, value } = blobSchema.fileBoughtAdmin.validate(req.params)

  if (error) {
    return sendResponse(res, STATUS_CODE.BAD_REQUEST, error.message)
  }

  const { orderItem } = value
  const blob = await blobService.fileBoughtAdmin(orderItem)

  if (!blob) {
    return sendResponse(
      res,
      STATUS_CODE.NOT_FOUND,
      'Chi tiết sản phẩm không tồn tại'
    )
  }

  return sendStream(res, blob.file)
}

export default {
  thumbnailPublic,
  fileAdmin,
  thumbnailBought,
  fileBought,
  fileBoughtAdmin,
}
