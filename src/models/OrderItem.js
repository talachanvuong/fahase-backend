import mongoose from 'mongoose'

const orderItemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 20000,
    },
    thumbnail: {
      type: Buffer,
      required: true,
    },
    file: {
      type: Buffer,
      required: true,
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
  },
  {
    versionKey: false,
    collection: 'order_items',
  }
)

orderItemSchema.index(
  {
    order: 1,
    product: 1,
  },
  {
    unique: true,
  }
)

const OrderItem = mongoose.model('OrderItem', orderItemSchema)

export default OrderItem
