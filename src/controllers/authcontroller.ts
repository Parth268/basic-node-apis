import { Request, Response } from "express";
const jwt = require("jsonwebtoken")
import bcrypt from "bcryptjs";
import { User } from "../models/User";
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "sefrtg"

// Generate JWT Token
const generateToken = (userId: string): string => {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1h" });
};


const generateUserHashCode = (): string => {
    return crypto.randomBytes(16).toString("hex"); // 16 bytes = 32 hex characters
};


// 🔐 Register User
export const register = async (req: Request, res: Response) => {
    const { name, email, password, authDeviceKey } = req.body;

    try {
        // Validate required fields
        console.log(req.body)
        if (!name || !email || !password || !authDeviceKey) {
            return res.status(400).json({ message: "name, email, password, authDeviceKey \nAll fields are required" });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashedPassword,
            isActive: true,
            logStatus: false,
            userHashCode: generateUserHashCode() ,
            isAdmin: false,
            authDeviceKey,
        });
        await user.save();

        return res.status(201).json({ message: "User created successfully", user });
    } catch (err) {
        console.error("Registration Error:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


// 🔑 Login User
export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Compare Password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        } else {

            res.status(200).json({
                message: "Login successful",
                token: generateToken(user.email),
            });
        }
    } catch (error: any) {
        console.error("Login Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// 🔄 Refresh Token
export const refreshToken = async (req: Request, res: Response) => {
    try {
        const { token } = req.body;
        if (!token) return res.status(401).json({ message: "Access Denied" });

        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
        const newToken = generateToken(decoded.userId);

        res.status(200).json({ token: newToken });
    } catch (error: any) {
        console.error("Token Refresh Error:", error);
        return res.status(403).json({ message: "Invalid Token" });
    }
};
