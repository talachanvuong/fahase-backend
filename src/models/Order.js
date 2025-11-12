import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema(
  {
    state: {
      type: String,
      required: true,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    versionKey: false,
  }
)

const Order = mongoose.model('Order', orderSchema)

export default Order
