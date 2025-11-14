import Joi from 'joi'

const add = Joi.object({
  content: Joi.string().trim().required().messages({
    'any.required': 'Thiếu content',
    'string.base': 'content phải là chuỗi',
    'string.empty': 'content không được để trống',
  }),
  product: Joi.string()
    .trim()
    .regex(/^[0-9a-f]{24}$/)
    .required()
    .messages({
      'any.required': 'Thiếu product',
      'string.base': 'product phải là chuỗi',
      'string.empty': 'product không được để trống',
      'string.pattern.base': 'product không hợp lệ',
    }),
})
  .required()
  .messages({
    'any.required': 'Thiếu body',
    'object.base': 'body phải là object',
    'object.unknown': 'Thừa trường',
  })

const getAllByProduct = Joi.object({
  product: Joi.string()
    .trim()
    .regex(/^[0-9a-f]{24}$/)
    .messages({
      'string.pattern.base': 'product không hợp lệ',
    }),
})

export default {
  add,
  getAllByProduct,
}
