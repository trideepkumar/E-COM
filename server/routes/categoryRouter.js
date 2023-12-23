import express from "express"
import { addCategory,addSubCategory } from "../controllers/categoryController.js"


const router = express.Router()


router.post("/add/new",addCategory)

//for adding subCategories

router.post("/add/subCat",addSubCategory)




export default router