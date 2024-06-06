import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js';
import Razorpay from 'razorpay';
import 'dotenv/config.js';
import crypto from 'crypto';



const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
});

// placing user order for frontend
const placeOrder = async (req, res) => {

    const newOrder = new orderModel({
        userId: req.body.userId,
        items: req.body.items,
        amount: req.body.amount,
        address: req.body.address
    })

    try {
       
        await userModel.findByIdAndUpdate(req.body.userId, {cartData:{}});

        const options = {
            amount: Number(req.body.amount*100),
            currency: "INR",
            receipt: crypto.randomBytes(10).toString("hex"),
         
            notes:{
                newOrder
            },

            // quantity:item.quantity 
        }

       


        razorpayInstance.orders.create(options, (error, order) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: "Something Went Wrong!" });
            }
            res.status(200).json({ data: order });
            console.log(order)
        });

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
        console.log(error);
    }
}

export {placeOrder};