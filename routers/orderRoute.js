import express from 'express';
import authMiddleware from '../middlewere/auth.js';
import { placeOrder } from '../controllers/orderController.js';
import { verifyOrder } from '../controllers/verifyController.js';
import { listOrders, updateOrderStatus, userOrders } from '../controllers/userOrdersController.js';


const orderRouter = express.Router();


// ROUTE 1 : Create Order Api Using POST Method http://localhost:5000/api/payment/order
orderRouter.post('/order',authMiddleware, placeOrder)


// ROUTE 2 : Create Verify Api Using POST Method http://localhost:5000/api/payment/verify
orderRouter.post('/verify',authMiddleware, verifyOrder)


// ROUTE 3 : get order data from User Api Using POST Method http://localhost:5000/api/payment/userOrders
orderRouter.post('/userorders',authMiddleware, userOrders )


// ROUTE 4 : get list of all order in Admin Panel using GET Method http://localhost:5000/api/payment/list
orderRouter.get('/list', listOrders )

// ROUTE 4 : Updateing the order status using POST Method http://localhost:5000/api/payment/status
orderRouter.post('/status', updateOrderStatus )


export default orderRouter;




