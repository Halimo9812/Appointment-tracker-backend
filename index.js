import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors'
import mongoose from 'mongoose';
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js';


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;
connectCloudinary

// ===== Connect to DB ===== //
try {
    await mongoose.connect(`${process.env.MONGODB_URI}/Apoointment Tracker`);
    console.log(`Connected to mongodb`);
} catch (error) {
    console.error(error);  
}

// ===== Middlewares ===== //
app.use(morgan('dev')); // logger
app.use(cors())
app.use(express.json()); // parse data to the body
app.use(express.urlencoded({extended: true}));


// ===== Routes ===== //

app.get('/', (req, res) => {
    res.send('Welcome to my project!')
});

//Add new doctor

app.use('/api/admin',adminRouter)
app.use ('/api/user', user)
// ===== Error Middlewares ===== //
app.use((e, req, res, next) => {
    console.error(e);
    res.status(500).json({message: e.message, error: e });
});


app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))

