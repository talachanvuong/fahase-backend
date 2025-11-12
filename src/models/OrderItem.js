import mongoose from 'mongoose'

const orderItemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
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
  },
  {
    versionKey: false,
  }
)

const OrderItem = mongoose.model('OrderItem', orderItemSchema)

export default OrderItem
