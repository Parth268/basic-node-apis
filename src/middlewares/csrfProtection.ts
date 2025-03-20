const csrf = require("csurf")
import { Request, Response, NextFunction } from "express";

export const csrfProtection = csrf({
    cookie: {
        httpOnly: true, // Protect against client-side JS attacks
        secure: process.env.NODE_ENV === "production", // Use secure cookies in production
        sameSite: "strict",
    },
});

export const csrfErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err.code === "EBADCSRFTOKEN") {
        return res.status(403).json({ message: "CSRF token validation failed" });
    }
    next(err);
};
