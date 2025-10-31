import mongoose from 'mongoose'
import AutoIncrementFactory from 'mongoose-sequence'

const AutoIncrement = AutoIncrementFactory(mongoose)

const categorySchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true, maxlength: 32 },
})

categorySchema.plugin(AutoIncrement, { inc_field: 'category_id' })

const Category = mongoose.model('Category', categorySchema)

export default Category
