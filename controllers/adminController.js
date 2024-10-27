import validator from 'validator'
import bcrypt from 'bcrypt'
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from '../models/doctorModel.js';
import jwt from 'jsonwebtoken'

//Add doctor// //all required data needs to be there 

const addDoctor = async (req, res) => {
    try {
        const { name, email, password, specialty, degree, experience, about, fees, address } = req.body;
        const imageFile = req.file

        if(!name|| !email || !password || ! specialty || degree || !experience || about || !fees || address) {
            return res.json({success:false, message: "Missing Details"})
        }
//email validation
if (!validator.isEmail(email)){
    return res.json({success:false, message: "Enter valid email"})
}
//validate if passowrd is strong//
if (password.length < 8){
    return res.json({success:false, message: "Enter a strong password"})
}

//Encrypting password using bcrypt//

const salt = await bcryypt.genSalt(10)
const hashedPassword = await bcrypt.hash(password, salt)

//Upload image to cloudinary//

const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type: "image"})
const imageUrl = imageUpload.secure_url

const doctorData ={
 name,
 email,
 image:imageUrl,
 password: hashedPassword,
 specialty,
 degree,
 experience,
 about,
 fees, 
 address: JSON.parse(address), // this will store address as an object in database
 date: Date.now()
}

const newDoctor = new doctorModel(doctorData)
await newDoctor.save()

        res.status(201).json({ message: 'Doctor added!' });
    } catch (error) {
        console.error(error); //log error 
        res.status(500).json({ message: 'Server Error' });
    }
};

// API FOR ADMIN LOGIN
const loginAdmin = async (req,res) => {
    try {
        const {email,password} = req.body
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
           
            const token = jwt.sign(email+password,process.env.JWT_SECRET )
            res.status(201).json({ message: 'success', token});

        }else {
            res.status(500).json({ message: 'Invalid creditials' });
        }
    } catch (error) {
        console.error(error); //log error 
        res.status(500).json({ message: 'Server Error' });
    }
}

export {addDoctor,loginAdmin}