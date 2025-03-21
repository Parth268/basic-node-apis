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

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.headers.authorization)
        if (!req.headers || !req.headers.authorization) {
            return res.status(401).json({ msg: "No token, authorization denied" });
        }

        const authHeader = req.headers.authorization;

        console.log("authHeader ",authHeader)
        
        if (!authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ msg: "Invalid token format" });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        
        req.user = decoded; // Attach user data to request
        next();
    } catch (error) {
        console.error("JWT Error:", error);
         res.status(401).json({ msg: "Authorization failed" });
    }
};
