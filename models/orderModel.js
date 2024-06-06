import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    items:{
        type:Array,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    address:{
        type:Object,
        default:{},
        required:true
    },
    status:{
        type:String,
        default:"Food Processing"
    },
    date:{
        type:Date,
        default:Date.now()
    },
    payment:{
        type:Boolean,
        default:true
    },
    razorpay_order_id:{
        type: String,
        required:true,
    },
    razorpay_payment_id:{
        type: String,
        required:true,
    },
    razorpay_signature:{
        type: String,
        required:true,
    },
  
})

const orderModel = mongoose.models.order || mongoose.model("razorpay_order",orderSchema);
export default orderModel;