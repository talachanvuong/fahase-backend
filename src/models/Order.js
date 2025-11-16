import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema(
  {
    paypalOrder: {
      type: String,
      required: true,
      unique: true,
    },
    state: {
      type: String,
      default: 'Chờ thanh toán',
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
