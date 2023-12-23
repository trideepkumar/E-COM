import express from "express"
const router = express.Router()

import {addTowishList} from '../controllers/wishListCotroller.js'




router.post("/add-to-wishlist" , addTowishList)





export default router