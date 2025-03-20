import { Request, Response } from "express";
import { User } from "../models/User";

// Extend Request type to include user
interface AuthRequest extends Request {
    user?: { id: string };
}

// 🔍 Get User Profile
export const getUserProfile = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.id; // Extracted from `authenticateToken` middleware

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized access" });
        }

        // Fetch user data (excluding password)
        const user = await User.findById(userId).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json({ success: true, user });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// 🔄 Update User Profile
export const updateUser = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.id;
        const { name, email } = req.body;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized access" });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { name, email },
            { new: true, runValidators: true }
        ).select("-password");

        if (!updatedUser) return res.status(404).json({ message: "User not found" });

        res.status(200).json({ success: true, user: updatedUser });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
