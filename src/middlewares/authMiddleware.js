import { STATUS_CODE } from '../utils/constantUtils.js'
import { sendResponse } from '../utils/responseUtils.js'

const tokenRequired = (req, res, next) => {
  if (!req.user) {
    return sendResponse(res, STATUS_CODE.UNAUTHORIZED, 'Chưa đăng nhập')
  }
  next()
}

const anonymousRequired = (req, res, next) => {
  if (req.user) {
    return sendResponse(res, STATUS_CODE.BAD_REQUEST, 'Đã đăng nhập')
  }
  next()
}

export default {
  tokenRequired,
  anonymousRequired,
}
