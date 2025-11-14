import jwt from 'jsonwebtoken'
import envConfig from '../config/envConfig.js'
import adminSchema from '../schemas/adminSchema.js'
import adminService from '../services/adminService.js'
import { STATUS_CODE } from '../utils/constantUtils.js'
import { sendResponse } from '../utils/responseUtils.js'

const create = async (req, res) => {
  const { error, value } = adminSchema.create.validate(req.body)

  if (error) {
    return sendResponse(res, STATUS_CODE.BAD_REQUEST, error.message)
  }

  const { display_name } = value

  if (await adminService.existByDisplayName(display_name)) {
    return sendResponse(res, STATUS_CODE.BAD_REQUEST, 'Tài khoản đã tồn tại')
  }

  await adminService.create(value)

  return sendResponse(res, STATUS_CODE.CREATED, 'Tạo tài khoản thành công')
}

const login = async (req, res) => {
  const { error, value } = adminSchema.login.validate(req.body)

  if (error) {
    return sendResponse(res, STATUS_CODE.BAD_REQUEST, error.message)
  }

  const { display_name, password } = value
  const admin = await adminService.getByDisplayName(display_name)

  if (!admin) {
    return sendResponse(res, STATUS_CODE.NOT_FOUND, 'Tài khoản không tồn tại')
  }

  if (!(await adminService.correctPassword(admin, password))) {
    return sendResponse(res, STATUS_CODE.BAD_REQUEST, 'Mật khẩu không đúng')
  }

  const token = jwt.sign(
    {
      _id: admin._id,
      display_name: admin.display_name,
    },
    envConfig.secretKey,
    {
      expiresIn: '1h',
    }
  )

  res.cookie('admin', token, {
    httpOnly: true,
    maxAge: 3600 * 1000,
  })

  return sendResponse(res, STATUS_CODE.SUCCESS, 'Đăng nhập thành công')
}

const logout = async (req, res) => {
  res.clearCookie('admin')
  return sendResponse(res, STATUS_CODE.SUCCESS, 'Đăng xuất thành công')
}

const me = async (req, res) => {
  return sendResponse(res, STATUS_CODE.SUCCESS, req.admin)
}

export default {
  create,
  login,
  logout,
  me,
}
