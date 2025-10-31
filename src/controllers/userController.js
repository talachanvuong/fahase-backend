import userService from '../services/userService.js'
import { STATUS_CODE } from '../utils/constantUtils.js'
import { sendResponse } from '../utils/responseUtils.js'

const me = async (req, res) => {
  const email = req.user.email
  const user = await userService.getByEmail(email)

  if (!user) {
    return sendResponse(res, STATUS_CODE.NOT_FOUND, 'Không có người dùng')
  }

  return sendResponse(res, STATUS_CODE.SUCCESS, user)
}

const logout = async (req, res) => {
  res.clearCookie('connect.sid')
  return sendResponse(res, STATUS_CODE.SUCCESS, 'Đăng xuất thành công')
}

export default {
  me,
  logout,
}
