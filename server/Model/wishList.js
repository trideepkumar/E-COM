import mongoose from 'mongoose';

const wishListSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products',
        required: [true, 'Enter valid productId']
    },
    quantity:{
       type:Number,
       required: [true, 'quantity cannot be empty']
    },
    active: {
      type: Boolean,
      default: true
    },
    modifiedOn: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

export const WishList = mongoose.model("WishList", wishListSchema);