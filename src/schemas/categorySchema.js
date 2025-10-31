import Joi from 'joi'

const getById = Joi.object({
  _id: Joi.string()
    .trim()
    .regex(/^[0-9a-f]{24}$/)
    .required()
    .messages({
      'any.required': 'Thiếu _id',
      'string.base': '_id phải là chuỗi',
      'string.empty': '_id không được để trống',
      'string.pattern.base': '_id không hợp lệ',
    }),
})
  .required()
  .messages({
    'any.required': 'Thiếu params',
    'object.base': 'params phải là object',
    'object.empty': 'params không được để trống',
    'object.unknown': 'Thừa trường',
  })

const add = Joi.object({
  title: Joi.string().trim().max(32).required().messages({
    'any.required': 'Thiếu title',
    'string.base': 'title phải là chuỗi',
    'string.empty': 'title không được để trống',
    'string.max': 'title quá dài',
  }),
})
  .required()
  .messages({
    'any.required': 'Thiếu body',
    'object.base': 'body phải là object',
    'object.empty': 'body không được để trống',
    'object.unknown': 'Thừa trường',
  })

const remove = Joi.object({
  _id: Joi.string()
    .trim()
    .regex(/^[0-9a-f]{24}$/)
    .required()
    .messages({
      'any.required': 'Thiếu _id',
      'string.base': '_id phải là chuỗi',
      'string.empty': '_id không được để trống',
      'string.pattern.base': '_id không hợp lệ',
    }),
})
  .required()
  .messages({
    'any.required': 'Thiếu params',
    'object.base': 'params phải là object',
    'object.empty': 'params không được để trống',
    'object.unknown': 'Thừa trường',
  })

export default {
  getById,
  add,
  remove,
}
