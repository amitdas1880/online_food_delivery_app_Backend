import express from 'express';
import {addToCart,removeFromCart,getCart} from '../controllers/cartController.js';
import authMiddleware from '../middlewere/auth.js';

const cartRouter = express.Router();

cartRouter.post('/add', authMiddleware , addToCart);
cartRouter.post('/remove', authMiddleware , removeFromCart);
cartRouter.post('/get', authMiddleware , getCart);
//cartRouter.get('/get',getCart);

export default cartRouter;