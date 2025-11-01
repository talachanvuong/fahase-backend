import Joi from 'joi'

const getAllByCategory = Joi.object({
  category: Joi.string()
    .trim()
    .regex(/^[0-9a-f]{24}$/)
    .required()
    .messages({
      'any.required': 'Thiếu category',
      'string.base': 'category phải là chuỗi',
      'string.empty': 'category không được để trống',
      'string.pattern.base': 'category không hợp lệ',
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
  title: Joi.string().trim().max(64).required().messages({
    'any.required': 'Thiếu title',
    'string.base': 'title phải là chuỗi',
    'string.empty': 'title không được để trống',
    'string.max': 'title quá dài',
  }),
  price: Joi.number().integer().min(0).required().messages({
    'any.required': 'Thiếu price',
    'number.base': 'price phải là số',
    'number.integer': 'price phải là số nguyên',
    'number.min': 'price không được nhỏ hơn 0',
  }),
  thumbnail: Joi.binary()
    .max(1024 * 1024 * 5)
    .required()
    .messages({
      'any.required': 'Thiếu thumbnail',
      'binary.base': 'thumbnail phải là binary',
      'binary.max': 'thumbnail không được vượt quá 5 MB',
    }),
  description: Joi.string().trim().max(4096).required().messages({
    'any.required': 'Thiếu description',
    'string.base': 'description phải là chuỗi',
    'string.empty': 'description không được để trống',
    'string.max': 'description quá dài',
  }),
  file: Joi.binary()
    .max(1024 * 1024 * 20)
    .required()
    .messages({
      'any.required': 'Thiếu file',
      'binary.base': 'file phải là binary',
      'binary.max': 'file không được vượt quá 20 MB',
    }),
  category: Joi.string()
    .trim()
    .regex(/^[0-9a-f]{24}$/)
    .required()
    .messages({
      'any.required': 'Thiếu category',
      'string.base': 'category phải là chuỗi',
      'string.empty': 'category không được để trống',
      'string.pattern.base': 'category không hợp lệ',
    }),
})
  .required()
  .messages({
    'any.required': 'Thiếu body',
    'object.base': 'body phải là object',
    'object.empty': 'body không được để trống',
    'object.unknown': 'Thừa trường',
  })

export default {
  getAllByCategory,
  add,
}
