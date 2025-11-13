import boughtSchema from '../schemas/boughtSchema.js'
import boughtService from '../services/boughtService.js'
import { STATUS_CODE } from '../utils/constantUtils.js'
import { sendResponse } from '../utils/responseUtils.js'

const isBought = async (req, res) => {
  const { error, value } = boughtSchema.isBought.validate(req.params)

  if (error) {
    return sendResponse(res, STATUS_CODE.BAD_REQUEST, error.message)
  }

  const { _id: user } = req.user
  const { product } = value

  const isBought = await boughtService.isBought(user, product)

  return sendResponse(res, STATUS_CODE.SUCCESS, !!isBought)
}

export default {
  isBought,
}
