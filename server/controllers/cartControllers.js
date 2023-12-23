import {Cart} from "../Model/cart.js"

export const addToCart = async(req,res)=>{
    const { productId, quantity,userId } = req.body;  
    console.log(productId,quantity,userId)
    try {
      let cart = await Cart.findOne({ userId:userId });
      if (cart) {
        console.log("cart exists!")
        await  Cart.findOneAndUpdate({userId:userId, productId: productId},  { $inc: { quantity: 1 } })
        res.status(200).send("cart Updated successfully !")
      } else {
        const newCart = await Cart.create({
         userId:userId,
         productId:productId,
         quantity:quantity
        });
        res.status(201).send(newCart);
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("Something went wrong");
    }
}