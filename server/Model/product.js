import mongoose from 'mongoose';


const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Product title is required"]
    },
    ram: {
        type: String,
        required: [true, "Product ram details is required"]
    },
    price: {
        type: Number,
        required: [true, "Product price details is required"]
    },
    totalProducts: {
        type: Number,
        required: [true, "Product stock details is required"]
    },
    description: {
        type: String,
        required: [true, "Product description details is required"]
    },
    images: {
        type: [String],
        required: [true, 'Images cannot be empty']
    },
    categoryId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    subCategoryId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory',
        required: true
    }
});



export const Products = mongoose.model('Products', productSchema)
