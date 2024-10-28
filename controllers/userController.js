import validator from "validator";
import bcrypt from 'bcrypt'
import userModel from "../models/userModel";
import { Jwt } from "jsonwebtoken";



//Register User//

const registerUser = async (req,res) =>{

    try {
        const { name, email, password} = req.body
        if( !name || !password || !email){
            return  res.status(500).json({ message: 'Missing Details' });
        }
            //Email validation
        if (!validator.isEmail(email)){
            return  res.status(500).json({ message: 'Enter valid email' });
        }  ///Passowed validation
        if (password.length <8){
            return  res.status(500).json({ message: 'Enter a strong password' });
        }

        //Encrypt password//

        const salt = await bcrypt.genSalt(10)
        const encryptedPassword = await bcrypt.encrypt(password,salt)

        const userData = {
            name,
            email,
            password: encryptedPassword
        }

        const newUser = new userModel (userData)
        const user = await newUser.save()

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET )

        res.status(201).json({ message: 'success', token});

    

    } catch (error) {
        console.error(error); //log error 
        res.status(500).json({ message: 'Server Error' });
    }
}

export {registerUser}
