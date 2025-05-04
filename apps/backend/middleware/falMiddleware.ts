import type { Request, Response, NextFunction } from "express";

const FAL_KEY = process.env.FAL_KEY;
export const falMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        if(token !== FAL_KEY){
            return res.status(403).json({ message: "Forbidden" });
        }
        next();
    } catch (error) {
        return res.status(403).json({ message: "Forbidden" });
    }
}