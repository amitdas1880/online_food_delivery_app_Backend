import foodModel from "../models/FoodModel.js";
import fs from "fs";


//add food items in database
const addFood = async (req,res)=>{
    let image_filename = `${req.file.filename}`;
     const food = new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename,
    })
    console.log(food.image)
    try {
        await food.save();
        res.json({success:true, message:"food saved successfully"})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:"error"})
    }
}


//show all Food list items from the database
const listFood = async(req,res)=>{
    try {
        const foods = await foodModel.find({});
        res.json({success:true, foods})        
    } catch (error) {
        console.log(error)
        res.json({success:false, message:"error"})
    }
}

//delete food items from the database
const removeFood = async(req,res) => {
        try {
            const food = await foodModel.findById(req.body.id);
            fs.unlink(`uploads/${food.image}`,()=>{});
            await foodModel.findByIdAndDelete(req.body.id);
            res.json({success:true, message:"food deleted successfully"})
        } catch (error) {
            console.log(error)
            res.json({success:false, message:"error"})            
        }
}

export {addFood,listFood,removeFood}