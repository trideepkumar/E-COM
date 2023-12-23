import { WishList } from "../Model/wishList.js";

export const  addTowishList = async (req,res) =>{
    const { productId, quantity,userId } = req.body; 
    console.log(productId,quantity,userId) 
    try {
        let wishlist = await WishList.findOne({ userId:userId });
        if (wishlist) {
          console.log("cart exists!")
          await  WishList.findOneAndUpdate({userId:userId, productId: productId},  { $inc: { quantity: 1 } })
          res.status(200).send("cart Updated successfully !")
        } else {
          const newWishList = await WishList.create({
           userId:userId,
           productId:productId,
           quantity:quantity
          });
          res.status(201).send(newWishList);
        }
      } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
      }
}