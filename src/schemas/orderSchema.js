import Joi from 'joi'

const getDetail = Joi.object({
  order: Joi.string()
    .trim()
    .regex(/^[0-9a-f]{24}$/)
    .messages({
      'string.pattern.base': 'order không hợp lệ',
    }),
})

export default {
  getDetail,
}
