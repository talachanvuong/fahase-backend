import Joi from 'joi'

const getById = Joi.object({
  _id: Joi.string()
    .trim()
    .regex(/^[0-9a-f]{24}$/)
    .messages({
      'string.pattern.base': '_id không hợp lệ',
    }),
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
    'object.unknown': 'Thừa trường',
  })

const remove = Joi.object({
  _id: Joi.string()
    .trim()
    .regex(/^[0-9a-f]{24}$/)
    .messages({
      'string.pattern.base': '_id không hợp lệ',
    }),
})

export default {
  getById,
  add,
  remove,
}
