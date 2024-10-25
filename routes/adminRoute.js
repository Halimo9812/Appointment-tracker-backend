import express from 'express'
import { addDoctor } from '../controllers/adminController'
import upload from '../middlewares/multer.js'


const adminRouter = express.Router()
console.log('Admin router ')

adminRouter.post('/add-doctor',upload.single('image'), addDoctor);

export default adminRouter
