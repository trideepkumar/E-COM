import express from "express"
const router = express.Router()
import {addToCart} from "../controllers/cartControllers.js"




router.post("/add-to-cart" , addToCart)





export default router