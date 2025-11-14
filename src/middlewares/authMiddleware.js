import jwt from 'jsonwebtoken'
import envConfig from '../config/envConfig.js'
import { STATUS_CODE } from '../utils/constantUtils.js'
import { sendResponse } from '../utils/responseUtils.js'

const tokenRequired = (req, res, next) => {
  if (!req.user) {
    return sendResponse(res, STATUS_CODE.UNAUTHORIZED, 'Chưa đăng nhập')
  }

  return next()
}

const anonymousRequired = (req, res, next) => {
  if (req.user) {
    return sendResponse(res, STATUS_CODE.BAD_REQUEST, 'Đã đăng nhập')
  }

  return next()
}

const notAdminRequired = (req, res, next) => {
  const token = req.cookies.admin

  if (!token) {
    return next()
  }

  jwt.verify(token, envConfig.secretKey, (error, decoded) => {
    if (!error) {
      return sendResponse(res, STATUS_CODE.BAD_REQUEST, 'Đã đăng nhập')
    }

    return next()
  })
}

const adminRequired = (req, res, next) => {
  const token = req.cookies.admin

  if (!token) {
    return sendResponse(res, STATUS_CODE.UNAUTHORIZED, 'Chưa đăng nhập')
  }

  jwt.verify(token, envConfig.secretKey, (error, decoded) => {
    if (error) {
      return sendResponse(res, STATUS_CODE.UNAUTHORIZED, 'Token lỗi')
    }

    const admin = {
      _id: decoded._id,
      display_name: decoded.display_name,
    }

    req.admin = admin

    return next()
  })
}

export default {
  tokenRequired,
  anonymousRequired,
  notAdminRequired,
  adminRequired,
}
