import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true, maxlength: 32 },
  },
  { versionKey: false }
)

const Category = mongoose.model('Category', categorySchema)

export default Category
