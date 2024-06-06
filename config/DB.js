import mongoose from 'mongoose';

export const connectDB = async()=>{
    await mongoose.connect('mongodb+srv://amitdas1880:9934180962@cluster0.glxqprh.mongodb.net/food-del')
    .then(() => console.log("---***MongoDB connected successfully***---"));
}