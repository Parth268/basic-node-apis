import cors from "cors";

export const corsOptions = {
    origin: ["https://trusted-site.com"], // Restrict API access
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Allow cookies
};
