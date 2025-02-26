import { Request, Response, NextFunction } from "express";

/**
 * обработка ошибок 
 */

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(`[ERROR] ${req.method} ${req.url} - ${err.message}`);
    
    res.status(err.status || 500).json({
        error: err.message || "Internal Server Error",
    });
};
