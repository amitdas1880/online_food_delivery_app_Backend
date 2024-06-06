import orderModel from '../models/orderModel.js';



//User orders for frontend
const userOrders = async(req,res)=>{
    try {
        const orders = await orderModel.find({userId: req.body.userId});
        res.json({success:true, data: orders});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"error"});
    }
}

// Listing Orders for admin panel
const listOrders = async(req,res)=>{
    try {
        const orders = await orderModel.find({});
        res.json({success:true, data: orders});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"error"});
    }
}


// Api for updating order status
const updateOrderStatus = async(req,res)=>{
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
        res.json({success:true, message:"Status updated successfully"});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"error"});
    }
}

export {userOrders,listOrders,updateOrderStatus};