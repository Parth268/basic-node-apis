const winston = require("winston")
import fs from "fs";
import path from "path";

// Ensure logs directory exists
const logDir = path.join(__dirname, "../../logs");
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);

// Create Winston Logger
const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({ filename: path.join(logDir, "error.log"), level: "error" }),
        new winston.transports.File({ filename: path.join(logDir, "access.log") }),
    ],
});

// Stream for Morgan (HTTP Logger)
export const logStream = {
    write: (message: string) => logger.info(message.trim()),
};

export default logger;
