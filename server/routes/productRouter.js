import express from "express"
const router = express.Router()
import { addProducts } from "../controllers/productController.js"

router.post('/add/new',addProducts)

export default router