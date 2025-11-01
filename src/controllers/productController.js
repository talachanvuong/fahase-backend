import productSchema from '../schemas/productSchema.js'
import categoryService from '../services/categoryService.js'
import productService from '../services/productService.js'
import { STATUS_CODE } from '../utils/constantUtils.js'
import { sendResponse } from '../utils/responseUtils.js'

const getAllByCategory = async (req, res) => {
  const { error, value } = productSchema.getAllByCategory.validate(req.params)

  if (error) {
    return sendResponse(res, STATUS_CODE.BAD_REQUEST, error.message)
  }

  const { category } = value

  if (!(await categoryService.existById(category))) {
    return sendResponse(
      res,
      STATUS_CODE.BAD_REQUEST,
      'Loại sản phẩm không tồn tại'
    )
  }

  const products = await productService.getAllByCategory(category)

  return sendResponse(res, STATUS_CODE.SUCCESS, products)
}

const add = async (req, res) => {
  const { error, value } = productSchema.add.validate(req.body)

  if (error) {
    return sendResponse(res, STATUS_CODE.BAD_REQUEST, error.message)
  }

  const { title, category } = value

  if (await productService.existByTitle(title)) {
    return sendResponse(res, STATUS_CODE.BAD_REQUEST, 'Sản phẩm đã tồn tại')
  }

  if (!(await categoryService.existById(category))) {
    return sendResponse(
      res,
      STATUS_CODE.BAD_REQUEST,
      'Loại sản phẩm không tồn tại'
    )
  }

  await productService.add(value)

  return sendResponse(res, STATUS_CODE.CREATED, 'Thêm sản phẩm thành công')
}

export default {
  getAllByCategory,
  add,
}
