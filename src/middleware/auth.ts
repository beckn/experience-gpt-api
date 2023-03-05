import { Request, Response, NextFunction } from "express";
import { default as jwt } from "jsonwebtoken";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("Authorization");

    if (!token) return res.status(401).send("Access denied. No token provided.");

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "") as any;

        if (decoded) {
            return next();
        } else {
            res.status(401).send("Invalid token.");
        }
    } catch (error) {
        res.status(401).send("Invalid token.");
    }
};
