import http from "http";
import app from "./app";
import dotenv from "dotenv";
// import { connectDB } from "./config/db";

// Load environment variables
dotenv.config();

// 📌 Define Port
const PORT = process.env.PORT || 5000;
const BASE_URL = process.env.BASE_URL

// 🚀 Start Server
const server = http.createServer(app);

server.listen(PORT, async () => {
    console.log(`✅ Server running on http://${BASE_URL}:${PORT}`);

    // 🗄️ Connect to Database
    // await connectDB();
});
