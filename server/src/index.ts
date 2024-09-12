import express, {Request, Response} from "express";
import cors from "cors"
import "dotenv/config"
import mongoose from "mongoose";

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.get('/', (req: Request, res: Response) => {
    res.json({message: 'gangnem'})
})

mongoose.connect(process.env.MONGODB_URI as string, {
    
})  
.then(() => app.listen(4001, () => {
    console.log(`Listening on localhost:4001...`)
}))
.catch(err => console.log(err))
