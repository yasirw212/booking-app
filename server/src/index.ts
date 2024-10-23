import express, {Request, Response} from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from './routes/users';
import authRoutes from './routes/auth';
import cookieParser from 'cookie-parser';
import path from "path";

const app = express();
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.use(express.static(path.join(__dirname, "../../client/dist")));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

mongoose.connect(process.env.MONGODB_URI as string, {
    
})  
.then(() => console.log("Connected to database: ", process.env.MONGODB_URI))
.then(() => app.listen(4001, () => {
    console.log(`Listening on localhost:4001...`)
}))
.catch(err => console.log(err))
