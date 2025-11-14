import blobSchema from '../schemas/blobSchema.js'
import blobService from '../services/blobService.js'
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

export default {
  thumbnailPublic,
}
