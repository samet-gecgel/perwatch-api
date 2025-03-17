import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import routes from "./routes";
import { loggerMiddleware } from "./middlewares/logger.middleware";
import { connectDB } from "./config/database";
import { logger } from "./utils/logger";
import { ERROR_MESSAGES } from "./constants/messages";
import { setupSwagger } from "./config/swagger";
dotenv.config();

const PORT = process.env.PORT;

const app: Application = express();

app.use(cors());
app.use(helmet({
  contentSecurityPolicy: false,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(loggerMiddleware);

setupSwagger(app);

app.use("/api", routes);

app.get("/", (req: Request, res: Response) => {
  res.redirect("/swagger");
});

app.use((req: Request, res:Response) => {
  res.status(404).json({
    message: ERROR_MESSAGES.SYSTEM.NOT_FOUND,
    status: "error"
  })
})

const startServer = async () => {
  try {
    await connectDB();

    const server = app.listen(PORT, () => {
      logger.info(ERROR_MESSAGES.SYSTEM.SERVER_STARTED, {
        port: PORT,
        env: process.env.NODE_ENV,
        timestamp: new Date().toISOString()
      });
    });

    return server;
  } catch (error) {
    logger.error(ERROR_MESSAGES.SYSTEM.SERVER_ERROR, {error});
    process.exit(1);
  }
}

// Test ortamında değilse sunucuyu başlat
if (process.env.NODE_ENV !== 'test') {
  startServer();
}

process.on("unhandledRejection", (err: Error) => {
  logger.error(ERROR_MESSAGES.SYSTEM.UNHANDLED_ERROR, {
    name: err.name,
    message: err.message,
    stack: err.stack
  });
  process.exit(1);
})

export { app, startServer };
