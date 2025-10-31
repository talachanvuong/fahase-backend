import Joi from 'joi'

const getById = Joi.object({
  category_id: Joi.number().integer().messages({
    'number.base': 'category_id phải là số',
    'number.integer': 'category_id phải là số nguyên',
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
  .messages({ 'any.required': 'Thiếu body' })

const remove = Joi.object({
  category_id: Joi.number().integer().messages({
    'number.base': 'category_id phải là số',
    'number.integer': 'category_id phải là số nguyên',
  }),
})

export default {
  getById,
  add,
  remove,
}
