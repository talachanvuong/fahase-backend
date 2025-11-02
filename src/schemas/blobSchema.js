import Joi from 'joi'

const thumbnail = Joi.object({
  product: Joi.string()
    .trim()
    .regex(/^[0-9a-f]{24}$/)
    .messages({
      'string.pattern.base': 'product không hợp lệ',
    }),
})

export default {
  thumbnail,
}
