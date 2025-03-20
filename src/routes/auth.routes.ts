import express from "express";
const authController = require("../controllers/authcontroller")

const router = express.Router();

router.post("/register", authController.register); // Ensure register is correctly typed
router.post("/login", authController.login); // Ensure register is correctly typed

export default router;
