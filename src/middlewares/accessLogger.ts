const morgan = require("morgan")
import { logStream } from "./logger";

// HTTP request logger middleware
const accessLogger = morgan("combined", { stream: logStream });

export default accessLogger;
