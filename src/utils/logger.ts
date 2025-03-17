import winston from "winston";
import path from "path";

const logDir = "logs";

const customFormat = winston.format.combine(
    winston.format.timestamp({format: "YYYY-MM-DD HH:mm:ss"}),
    winston.format.printf(({timestamp, level, message, ...meta}) => {
        const metaString = Object.keys(meta).length ? JSON.stringify(meta, null, 2) : "";
        return `${timestamp} [${level.toUpperCase()}] ${message} ${metaString}`;
    })
);

const logger = winston.createLogger({
    level: process.env.NODE_ENV === "production" ? "debug" : "info",
    format: customFormat,
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                customFormat
            )
        }),

        new winston.transports.File({
            filename: path.join(logDir, "combined.log"),
        }),

        new winston.transports.File({
            filename: path.join(logDir, "errors.log"),
            level: "error",
        })
    ]
});

const httpLogger = (req: any, res: any, responseTime: number) => {
    const { method, url, ip} = req;
    const status = res.statusCode;

    logger.info("HTTP isteği", {
        method,
        url,
        status,
        ip,
        responseTime: `${responseTime}ms`
    })
}

export { logger, httpLogger };
