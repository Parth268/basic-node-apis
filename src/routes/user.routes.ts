import express from "express";
const usercontroller =  require("../controllers/usercontroller")
const { authenticateToken }  =  require( "../middlewares/auth.middleware");

const router = express.Router();

router.get("/profile", authenticateToken, usercontroller.getUserProfile);
router.put("/update", authenticateToken, usercontroller.updateUser);

export default router;
