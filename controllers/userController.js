import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';


// Login User
const loginUser = async(req,res) => {
    const {email, password} = req.body;
    try {
        const user = await userModel.findOne({ email: email})
        if(!user) {
            return res.status(400).json({
                success:false,
                message:"User does not exists"
            })
        }

        // checking the password is correct or not
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) {
            return res.status(400).json({
                success:false,
                message:"Incorrect password"
            })
        }
        // if password match it generate token
        const token = createToken(user._id)
        res.status(200).json({
            success:true,
            token:token,
            })
    } catch (error){
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Server Error"
        })
    }
}

// Create JSON Web Token

const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}

// Register User
const registerUser = async(req,res) => {
        const {name, email, password} =  req.body;
        try {
            // Checkng user already exists or not
            const exists = await userModel.findOne({email: email})
            if(exists) {
                return res.status(400).json({
                    success:false,
                    message:"User already exists"
                })
            }
            // validating email format and strong password 
                // checking the email format is valid or not
            if(!validator.isEmail(email)){
                return res.status(400).json({
                    success:false,
                    message:"Invalid email format"
                })
            }

            // checking the password is strong or not
            if(password.length<8){
                return res.status(400).json({
                    success:false,
                    message:"Please enter a strong password"
                })
            }

            // hashing user password
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password,salt);
                           // OR
            //const hashedPassword = await bcrypt.hash(password,10);

            const newUser = new userModel({
                name:name,
                email:email,
                password:  hashedPassword
            })

            // Save new user into the database
            const user = await newUser.save();
            const token = createToken(user._id);

            res.json({success: true, token: token})
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success:false,
                message:"Server Error"
            })
        }
}

export {loginUser,registerUser}

