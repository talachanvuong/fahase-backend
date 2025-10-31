import { STATUS_CODE } from '../utils/constantUtils.js'
import { sendResponse } from '../utils/responseUtils.js'

export default (err, req, res, next) => {
  return sendResponse(res, STATUS_CODE.INTERNAL_SERVER_ERROR, err.message)
}
