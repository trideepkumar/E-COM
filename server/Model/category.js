import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: [true, 'Category name cannot be empty']
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, {
  toJSON: {virtuals: true},
  toObject: {virtuals: true}
})


 export const Category = mongoose.model('Category', categorySchema)
