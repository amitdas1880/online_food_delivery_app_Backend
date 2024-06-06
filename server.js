import express from "express";
import cors from "cors";
import { connectDB } from "./config/DB.js";
import foodRouter from "./routers/foodRoutes.js";
import userRouter from "./routers/userRoute.js";
import cartRouter from "./routers/cartRoute.js";
import 'dotenv/config.js';
import orderRouter from "./routers/orderRoute.js";

//app config
const app = express();
const port = process.env.port || 5000;

//middlewares
app.use(express.json());
app.use(cors());

//MongoDB Connection
connectDB()

//api endpoints
app.use("/api/food",foodRouter)
app.use("/images",express.static("uploads"))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)

app.use("/api/payment",orderRouter)



app.get('/', (req, res) => {
    res.status(200).send('API Working')
})

app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`)
})