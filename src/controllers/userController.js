import { STATUS_CODE } from '../utils/constantUtils.js'
import { sendResponse } from '../utils/responseUtils.js'

const me = async (req, res) => {
  return sendResponse(res, STATUS_CODE.SUCCESS, req.user)
}

const logout = async (req, res) => {
  res.clearCookie('connect.sid')
  return sendResponse(res, STATUS_CODE.SUCCESS, 'Đăng xuất thành công')
}

export default {
  me,
  logout,
}
