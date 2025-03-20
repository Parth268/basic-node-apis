import { Request, Response, NextFunction } from "express";
const jwt = require("jsonwebtoken")
import dotenv from "dotenv";

dotenv.config();

// Extend request object to include `user`
declare module "express-serve-static-core" {
    interface Request {
        user?: { id: string };
    }
}

// 🔐 Middleware to Authenticate JWT
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("Authorization")?.split(" ")[1]; // Extract Bearer Token

    if (!token) return res.status(401).json({ message: "Access Denied. No Token Provided" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };
        req.user = { id: decoded.userId }; // Attach user ID to request
        next();
    } catch (error) {
        res.status(403).json({ message: "Invalid or Expired Token" });
    }
};
