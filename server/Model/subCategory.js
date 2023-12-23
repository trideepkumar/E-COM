import mongoose from 'mongoose';


const subCategorySchema = mongoose.Schema({
    subCategoryName: {
        type: String,
        required: true,
    },
    Category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required:true
    },
})

export const subCategory = mongoose.model('SubCategory', subCategorySchema);