import express from "express";
import dotenv from "dotenv";
// import bcrypt from 'bcryptjs'
import authRoutes from './routes/auth.routes.js'
import userRoutes from './routes/user.routes.js'
import postRoutes from './routes/post.routes.js'
import notificationRoutes from './routes/notification.routes.js'
import connectMongoDB from "./db/connectMongoDb.js";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";
// const cors =require('cors'); 
import cors from 'cors';

const corsOptions={

    origin:"http://localhost:3000",
    methods:"GET,POST,PUT,DELETE,PATCH,HEAD",
    credentials:true,

};

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const app = express();
const PORT = 5000;

app.use(express.json({limit:"5mb"}));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/notifications", notificationRoutes);

app.listen(PORT, () => {
    console.log(`server is running at port ${PORT}`);
    connectMongoDB();
})


