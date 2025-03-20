import express from "express";
import helmet from "helmet";
import cors from "cors";
const compression = require("compression");
const morgan = require("morgan");
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { apiLimiter } from "./middlewares/rateLimit";
import { csrfProtection } from "./middlewares/csrfProtection";
import { errorHandler } from "./middlewares/errorHandler";
import { corsOptions } from "./config/security";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import connectDB from "./config/db";

import rateLimit from "express-rate-limit";
import hpp from "hpp";
import mongoSanitize from "express-mongo-sanitize";

// Load environment variables
dotenv.config();
connectDB()

// Initialize Express app
const app = express();

// 🛡️ Security Middleware
app.use(helmet()); // Secure HTTP headers
app.use(cors(corsOptions)); // CORS protection
// app.use(csrfProtection); // CSRF protection
app.use(apiLimiter); // Rate limiting

// 📦 Middleware for Performance
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true })); // Parse form data
app.use(compression()); // Compress responses
app.use(cookieParser()); // Cookie handling
try {
    app.use(compression());
} catch (error) {
    console.error("Compression Error:", error);
}

try {
    app.use(morgan("dev"));
} catch (error) {
    console.error("Morgan Error:", error);
}


app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use(hpp());
app.use(mongoSanitize());

// 🚀 API Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);

// 🛑 Error Handling Middleware
app.use(errorHandler);

export default app;
