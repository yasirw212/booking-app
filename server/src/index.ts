import express, {Request, Response} from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from './routes/users'
import authRoutes from './routes/auth'

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))



app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

mongoose.connect(process.env.MONGODB_URI as string, {
    
})  
.then(() => app.listen(7000, () => {
    console.log(`Listening on localhost:7000...`)
}))
.catch(err => console.log(err))
