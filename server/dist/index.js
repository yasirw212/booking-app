"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const users_1 = __importDefault(require("./routes/users"));
const auth_1 = __importDefault(require("./routes/auth"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: [process.env.FRONTEND_URL, "http://34.122.199.84", "http://localhost:8081"]
}));
app.use("/api/auth", auth_1.default);
app.use("/api/users", users_1.default);
mongoose_1.default.connect(process.env.MONGODB_URI, {})
    .then(() => console.log("Connected to database: ", process.env.MONGODB_URI))
    .then(() => app.listen(4001, () => {
    console.log(`Listening on localhost:4001...`);
}))
    .catch(err => console.log(err));
