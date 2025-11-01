import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    price: { type: Number, required: true, min: 0 },
    thumbnail: { type: Buffer, required: true },
    description: { type: String, required: true },
    file: { type: Buffer, required: true },
    isDiscontinued: { type: Boolean, default: false },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
  },
  { versionKey: false }
)

const Product = mongoose.model('Product', productSchema)

export default Product
