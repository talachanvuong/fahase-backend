import Joi from 'joi'

const create = Joi.object({
  display_name: Joi.string().trim().required().messages({
    'any.required': 'Thiếu display_name',
    'string.base': 'display_name phải là chuỗi',
    'string.empty': 'display_name không được để trống',
  }),
  password: Joi.string().trim().required().messages({
    'any.required': 'Thiếu password',
    'string.base': 'password phải là chuỗi',
    'string.empty': 'password không được để trống',
  }),
})
  .required()
  .messages({
    'any.required': 'Thiếu body',
    'object.base': 'body phải là object',
    'object.unknown': 'Thừa trường',
  })

const login = Joi.object({
  display_name: Joi.string().trim().required().messages({
    'any.required': 'Thiếu display_name',
    'string.base': 'display_name phải là chuỗi',
    'string.empty': 'display_name không được để trống',
  }),
  password: Joi.string().trim().required().messages({
    'any.required': 'Thiếu password',
    'string.base': 'password phải là chuỗi',
    'string.empty': 'password không được để trống',
  }),
})
  .required()
  .messages({
    'any.required': 'Thiếu body',
    'object.base': 'body phải là object',
    'object.unknown': 'Thừa trường',
  })

export default {
  create,
  login,
}
