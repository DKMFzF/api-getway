import { Request, Response, NextFunction } from "express";

/**
 * логгер для сервиса 
 */

export const logger = (req: Request, res: Response, next: NextFunction) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
};
