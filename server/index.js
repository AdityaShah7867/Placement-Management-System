import express from 'express';  
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors';
import userRouter from './routes/user.route.js';
import placementRouter from './routes/placement.routes.js';
import bodyParser from 'body-parser';



dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/user',userRouter);
app.use('/api/placement',placementRouter);
app.use('/uploads', express.static('uploads'));



app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})