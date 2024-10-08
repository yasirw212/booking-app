import express, { NextFunction, Request, Response} from "express";
import { check, validationResult } from "express-validator";
import { User } from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
import { verifyToken } from "../middleware/auth";

const router = express.Router();
dotenv.config();

// validate form fields
// Check if the user exists
// If unable to connect to db send a server status error to the client
// If the user does not exists then return an error
// If the user exists then you must compare the password submitted with the password of said user
// If the credentials match up create a jwt token and then place it with in a cookie to be sent back to the client
// Send a success json response to the client
router.post("/login", [
    check('email', "Email is required").isEmail(),
    check('password', "Password must be at least 6 characters").isLength({min: 6})
    ], 
    async (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({message: errors.array()})
        }

        const {email, password} = req.body
       
        try {
            const user = await User.findOne({email: email})

            if(!user){
               return res.status(400).json({message: "Invalid Credentials"})
            }

            const match = bcrypt.compare(user?.password as string, password)
            if(!match){
                return res.status(400).json({message: "Invalid Credentials"})
            }

            const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET_KEY as string, {
                expiresIn: "1d"
            })
            res.cookie("auth_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 8640000
            })

            res.status(200).json({userId: user._id})
        } catch (error) {
            console.log(error)
            res.status(500).json({message: "Something went wrong"})
        }
    }
)

router.get("/validate-token", verifyToken, (req: Request, res: Response) => {
    res.status(200).send({userId: req.userId})
})

router.post("/logout", async (req: Request, res: Response) => {
    console.log()
    res.cookie("auth_token", "", {
        expires: new Date(0)
    });
    res.send();
})





export default router;