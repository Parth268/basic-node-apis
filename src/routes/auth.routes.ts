import express from "express";
import { validateAuth } from "../validators/auth.validator";
const authController = require("../controllers/authcontroller")

const router = express.Router();

router.post("/register", validateAuth, authController.register); // Ensure register is correctly typed
router.post("/login", validateAuth, authController.login); // Ensure register is correctly typed

export default router;
