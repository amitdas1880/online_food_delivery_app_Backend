import 'dotenv/config.js';
import crypto from 'crypto';
import orderModel from '../models/orderModel.js';





const verifyOrder = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature,amount,address,items} = req.body;

    console.log("req.body", req.body);
    const userId = req.body.userId;
    try {
       // Create Sign
       const sign = razorpay_order_id + "|" + razorpay_payment_id;

       // Create ExpectedSign
       const expectedSign = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET)
           .update(sign.toString())
           .digest("hex");

        console.log(razorpay_signature === expectedSign);

       // Create isAuthentic
       const isAuthentic = expectedSign === razorpay_signature;

       // Condition 
       if (isAuthentic===true) {
           const payment = new orderModel({
               razorpay_order_id,
               razorpay_payment_id,
               razorpay_signature,
               amount,
               userId,
               address,
               items,
           });

           // Save Payment 
           await payment.save();

           // Send Message 
           res.json({
               message: "Payment Successfully",
            });
           
       }
    } catch (error) {
       res.status(500).json({ message: "Server Error!" });
       console.log(error);
    }

}


export {verifyOrder}