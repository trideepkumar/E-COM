import express from "express";
import cors from "cors";
import db from "./config/db.config.js";
import userRouter from './routes/userRouter.js'
import productRouter from './routes/productRouter.js'
import categoryRouter from './routes/categoryRouter.js'
import cartRouter from './routes/cartRouter.js'
import wishListRouter from './routes/wishListRouter.js'
import passport from "passport";



import { config } from 'dotenv';  
config();  


const app = express();
const PORT = process.env.PORT || 3000;

//middlewares
app.use(cors());
app.use(express.json());
app.use(passport.initialize());



//db
let server
db.once("open", () => {
  server = app.listen(PORT, () => {
    console.log(`Server listening to port ${PORT}`)
  })
})



app.use(express.json())
app.use(express.urlencoded({ extended: false }))


//routes
app.use("/api", userRouter)
app.use("/api/products",productRouter)
app.use("/api/categories",categoryRouter)
app.use("/api/cart",cartRouter)
app.use("/api/wishList",wishListRouter)