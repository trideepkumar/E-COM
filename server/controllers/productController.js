import { Products } from "../Model/product.js";
import {
    validateProductDetails
} from "../helpers/productHelpers.js"


export const addProducts = async(req,res)=>{
    try{
        const existing = await Products.find({title: req.body.title})
        console.log(existing)
       
        console.log("description", req.body.description);
        const product = new Products({
            title: req.body.title,
            ram:req.body.ram,
            categoryId: req.body.categoryId,
            subCategoryId:req.body.subCategoryId,
            description: req.body.description,
            price: req.body.price,
            totalProducts: req.body.totalProducts,
            images: req.body.images
          })
          console.log("product",product)
          if(existing.length === 0){
            try{
                console.log("hello")
            const  isValid = validateProductDetails(product)
            console.log(isValid)
            if(isValid){
                await product.save()
                res.status(200).json(Products).message("product saved successsfully !")
            }
            }catch(err){
                res.status(500).json({ error: 'Something went wrong!' });
            }
          }

    }catch (error) {
        console.log(error)
      }
}