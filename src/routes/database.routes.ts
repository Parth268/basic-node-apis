import express from "express";
const { authenticateToken } = require("../middlewares/auth.middleware");
const router = express.Router();
import dotenv from "dotenv";
import connectDB from "../config/db";
dotenv.config();

const DROP_TOKEN = process.env.DROP_TOKEN

router.post("/drop-all", authenticateToken,async (req, res) => {
    try {

        const { drop_token } = req.body
       
        if (drop_token == DROP_TOKEN) {
            const db = connectDB()
            
            res.status(200).json({ message: "All collections dropped successfully" });
        } else {
            res.status(200).json({ message: "No Access" });
        }
    } catch (error) {
        console.error("Error dropping collections:", error);
        res.status(500).json({ message: "Failed to drop collections", error });
    }
});




export default router;
