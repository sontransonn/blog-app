import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from 'url';
import cookieParser from "cookie-parser";

import "./configs/dotenvConfig.js"
import corsConfig from "./configs/corsConfig.js"

import {
    errorResponserHandler,
    invalidPathHandler
} from "./middlewares/errorMiddleware.js";

import userRoute from "./routes/userRoute.js"

import { connectDB } from "./services/dbService.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT || 8080

app.use(corsConfig);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use("/api/user", userRoute)

app.use(invalidPathHandler)
app.use(errorResponserHandler)

app.listen(PORT, () => {
    connectDB()
    console.log(`Server is running on port: ${PORT}`);
})