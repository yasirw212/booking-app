"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const user_1 = require("../models/user");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
dotenv_1.default.config();
// validate form fields
// Check if the user exists
// If unable to connect to db send a server status error to the client
// If the user does not exists then return an error
// If the user exists then you must compare the password submitted with the password of said user
// If the credentials match up create a jwt token and then place it with in a cookie to be sent back to the client
// Send a success json response to the client
router.post("/login", [
    (0, express_validator_1.check)('email', "Email is required").isEmail(),
    (0, express_validator_1.check)('password', "Password must be at least 6 characters").isLength({ min: 6 })
], (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
    }
    const { email, password } = req.body;
    try {
        const user = yield user_1.User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }
        const match = bcryptjs_1.default.compare(user === null || user === void 0 ? void 0 : user.password, password);
        if (!match) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: "1d"
        });
        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 8640000
        });
        res.status(200).json({ userId: user._id });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}));
router.get("/validate-token", auth_1.verifyToken, (req, res) => {
    return res.status(200).send({ userId: req.userId });
});
router.post("/logout", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.cookie("auth_token", "", {
        expires: new Date(0)
    });
    res.send();
}));
exports.default = router;
