import Joi from 'joi'

const getAllByCategory = Joi.object({
  category: Joi.string()
    .trim()
    .regex(/^[0-9a-f]{24}$/)
    .messages({
      'string.pattern.base': 'category không hợp lệ',
    }),
})

const add = Joi.object({
  title: Joi.string().trim().required().messages({
    'any.required': 'Thiếu title',
    'string.base': 'title phải là chuỗi',
    'string.empty': 'title không được để trống',
  }),
  price: Joi.number().integer().min(0).required().messages({
    'any.required': 'Thiếu price',
    'number.base': 'price phải là số',
    'number.integer': 'price phải là số nguyên',
    'number.min': 'price không được nhỏ hơn 0',
  }),
  thumbnail: Joi.binary().required().messages({
    'any.required': 'Thiếu thumbnail',
    'binary.base': 'thumbnail phải là binary',
  }),
  description: Joi.string().trim().required().messages({
    'any.required': 'Thiếu description',
    'string.base': 'description phải là chuỗi',
    'string.empty': 'description không được để trống',
  }),
  file: Joi.binary().required().messages({
    'any.required': 'Thiếu file',
    'binary.base': 'file phải là binary',
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
    'object.unknown': 'Thừa trường',
  })

const getById = Joi.object({
  _id: Joi.string()
    .trim()
    .regex(/^[0-9a-f]{24}$/)
    .messages({
      'string.pattern.base': '_id không hợp lệ',
    }),
})

const updateParams = Joi.object({
  _id: Joi.string()
    .trim()
    .regex(/^[0-9a-f]{24}$/)
    .messages({
      'string.pattern.base': '_id không hợp lệ',
    }),
})

const updateBody = Joi.object({
  title: Joi.string().trim().messages({
    'string.base': 'title phải là chuỗi',
    'string.empty': 'title không được để trống',
  }),
  price: Joi.number().integer().min(0).messages({
    'number.base': 'price phải là số',
    'number.integer': 'price phải là số nguyên',
    'number.min': 'price không được nhỏ hơn 0',
  }),
  thumbnail: Joi.binary().messages({
    'binary.base': 'thumbnail phải là binary',
  }),
  description: Joi.string().trim().messages({
    'string.base': 'description phải là chuỗi',
    'string.empty': 'description không được để trống',
  }),
  file: Joi.binary().messages({
    'binary.base': 'file phải là binary',
  }),
  category: Joi.string()
    .trim()
    .regex(/^[0-9a-f]{24}$/)
    .messages({
      'string.base': 'category phải là chuỗi',
      'string.empty': 'category không được để trống',
      'string.pattern.base': 'category không hợp lệ',
    }),
})
  .required()
  .messages({
    'any.required': 'Thiếu body',
    'object.base': 'body phải là object',
    'object.unknown': 'Thừa trường',
  })

export default {
  getAllByCategory,
  add,
  getById,
  updateParams,
  updateBody,
}
