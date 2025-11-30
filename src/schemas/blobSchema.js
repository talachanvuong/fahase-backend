import Joi from 'joi'

const thumbnailPublic = Joi.object({
  product: Joi.string()
    .trim()
    .regex(/^[0-9a-f]{24}$/)
    .messages({
      'string.pattern.base': 'product không hợp lệ',
    }),
})

const fileAdmin = Joi.object({
  product: Joi.string()
    .trim()
    .regex(/^[0-9a-f]{24}$/)
    .messages({
      'string.pattern.base': 'product không hợp lệ',
    }),
})

const thumbnailBought = Joi.object({
  orderItem: Joi.string()
    .trim()
    .regex(/^[0-9a-f]{24}$/)
    .messages({
      'string.pattern.base': 'orderItem không hợp lệ',
    }),
})

const fileBought = Joi.object({
  orderItem: Joi.string()
    .trim()
    .regex(/^[0-9a-f]{24}$/)
    .messages({
      'string.pattern.base': 'orderItem không hợp lệ',
    }),
})

const fileBoughtAdmin = Joi.object({
  orderItem: Joi.string()
    .trim()
    .regex(/^[0-9a-f]{24}$/)
    .messages({
      'string.pattern.base': 'orderItem không hợp lệ',
    }),
})

export default {
  thumbnailPublic,
  fileAdmin,
  thumbnailBought,
  fileBought,
  fileBoughtAdmin,
}
