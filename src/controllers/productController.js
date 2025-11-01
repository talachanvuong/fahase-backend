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
    return sendResponse(res, STATUS_CODE.BAD_REQUEST, 'Tên sản phẩm đã tồn tại')
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

const getById = async (req, res) => {
  const { error, value } = productSchema.getById.validate(req.params)

  if (error) {
    return sendResponse(res, STATUS_CODE.BAD_REQUEST, error.message)
  }

  const { _id } = value
  const product = await productService.getById(_id)

  if (!product) {
    return sendResponse(res, STATUS_CODE.BAD_REQUEST, 'Sản phẩm không tồn tại')
  }

  return sendResponse(res, STATUS_CODE.SUCCESS, product)
}

const update = async (req, res) => {
  const { error: errorParams, value: valueParams } =
    productSchema.updateParams.validate(req.params)

  if (errorParams) {
    return sendResponse(res, STATUS_CODE.BAD_REQUEST, errorParams.message)
  }

  const { error: errorBody, value: valueBody } =
    productSchema.updateBody.validate(req.body)

  if (errorBody) {
    return sendResponse(res, STATUS_CODE.BAD_REQUEST, errorBody.message)
  }

  const { _id } = valueParams
  const product = await productService.getRawById(_id)

  if (!product) {
    return sendResponse(res, STATUS_CODE.BAD_REQUEST, 'Sản phẩm không tồn tại')
  }

  if ('title' in valueBody) {
    if (await productService.existByTitle(valueBody.title)) {
      return sendResponse(res, STATUS_CODE.BAD_REQUEST, 'Tên sản phẩm đã tồn tại')
    }
  }

  if ('category' in valueBody) {
    if (!(await categoryService.existById(valueBody.category))) {
      return sendResponse(
        res,
        STATUS_CODE.BAD_REQUEST,
        'Loại sản phẩm không tồn tại'
      )
    }
  }

  await productService.update(product, valueBody)

  return sendResponse(res, STATUS_CODE.SUCCESS, 'Sửa sản phẩm thành công')
}

export default {
  getAllByCategory,
  add,
  getById,
  update,
}
