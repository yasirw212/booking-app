import express, {Request, Response} from "express";
import cloudinary from "cloudinary";
import multer from 'multer';
import Hotel, { HotelType } from "../models/hotel";
import { verifyToken } from "../middleware/auth";
import { body } from "express-validator";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB
    }
})

router.post(
    "/", 
    verifyToken,
    [
        body("name").notEmpty().withMessage('Name is required'),
        body("city").notEmpty().withMessage('City is required'),
        body("country").notEmpty().withMessage('Country is required'),
        body("description").notEmpty().withMessage('description is required'),
        body("type").notEmpty().withMessage('Hotel type is required'),
        body("pricePerNight").notEmpty().isNumeric().withMessage('Price per night is required and must be a number'),
        body("facilities").notEmpty().isArray().withMessage("Facilities are required"),
    ],
    upload.array("imageFiles", 6), 
    async (req: Request, res: Response) => {
        try {
            const imageFiles = req.files as Express.Multer.File[];
            const newHotel: HotelType = req.body;

            // 1. Upload the images to cloudinary
            const uploadPromises = imageFiles.map( async(image) => {
                // Encoding the image as a base64 string
                const b64 = Buffer.from(image.buffer).toString("base64");
                // Creating a string that describes the image
                let dataURI="data:" + image.mimetype + ";base64," + b64;
                // Using the cloudinary sdk to upload this image to our account
                const res = await cloudinary.v2.uploader.upload(dataURI);
                return res.url;
            })

            const imageUrls = await Promise.all(uploadPromises)
            // 2. if the upload was successful, add the URLs to the new hotel
            newHotel.imageUrls = imageUrls
            newHotel.lastUpdated = new Date();
            newHotel.userId = req.userId;
            // 3. save the new hotel in our database
            const hotel = new Hotel(newHotel);
            await hotel.save();
            // 4. return a 201 status
            res.status(201).send(hotel);
        } catch (error) {
            console.log("Error creating hotel: ", error);
            res.status(500).json({message: "Something went wrong"});
        }
    }
);

export default router;