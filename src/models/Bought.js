import mongoose from 'mongoose'

const boughtSchema = new mongoose.Schema(
  {
    created_at: {
      type: Date,
      default: Date.now,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
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
  }
)

boughtSchema.index(
  {
    user: 1,
    product: 1,
  },
  {
    unique: true,
  }
)

const Bought = mongoose.model('Bought', boughtSchema)

export default Bought
