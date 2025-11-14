import categorySchema from '../schemas/categorySchema.js'
import categoryService from '../services/categoryService.js'
import { STATUS_CODE } from '../utils/constantUtils.js'
import { sendResponse } from '../utils/responseUtils.js'

const getAll = async (req, res) => {
  const categories = await categoryService.getAll()
  return sendResponse(res, STATUS_CODE.SUCCESS, categories)
}

const getById = async (req, res) => {
  const { error, value } = categorySchema.getById.validate(req.params)

  if (error) {
    return sendResponse(res, STATUS_CODE.BAD_REQUEST, error.message)
  }

  const { _id } = value
  const category = await categoryService.getById(_id)

  if (!category) {
    return sendResponse(res, STATUS_CODE.NOT_FOUND, 'Loại sản phẩm không tồn tại')
  }

  return sendResponse(res, STATUS_CODE.SUCCESS, category)
}

const add = async (req, res) => {
  const { error, value } = categorySchema.add.validate(req.body)

  if (error) {
    return sendResponse(res, STATUS_CODE.BAD_REQUEST, error.message)
  }

  const { title } = value

  if (await categoryService.existByTitle(title)) {
    return sendResponse(
      res,
      STATUS_CODE.BAD_REQUEST,
      'Tên loại sản phẩm đã tồn tại'
    )
  }

  await categoryService.add(value)

  return sendResponse(res, STATUS_CODE.CREATED, 'Thêm loại sản phẩm thành công')
}

const remove = async (req, res) => {
  const { error, value } = categorySchema.remove.validate(req.params)

  if (error) {
    return sendResponse(res, STATUS_CODE.BAD_REQUEST, error.message)
  }

  const { _id } = value

  if (!(await categoryService.existById(_id))) {
    return sendResponse(
      res,
      STATUS_CODE.NOT_FOUND,
      'Loại sản phẩm không tồn tại'
    )
  }

  if (await categoryService.containProduct(_id)) {
    return sendResponse(res, STATUS_CODE.BAD_REQUEST, 'Còn sản phẩm thuộc loại')
  }

  await categoryService.remove(_id)

  return sendResponse(res, STATUS_CODE.SUCCESS, 'Xóa loại sản phẩm thành công')
}

export default {
  getAll,
  getById,
  add,
  remove,
}
