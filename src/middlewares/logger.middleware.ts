import { Request, Response, NextFunction } from "express";
import { httpLogger } from "../utils/logger";

export const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();

    res.on("finish", () => {
        const responseTime = Date.now() - start;
        httpLogger(req, res, responseTime);
    })

    next();
}
