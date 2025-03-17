import mongoose from "mongoose";
import dotenv from "dotenv";
import { logger } from "../utils/logger";
import { ERROR_MESSAGES } from "../constants/messages";

dotenv.config();

const options = {
    autoIndex: true,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000
}

export const connectDB = async (): Promise<void> => {
    try {
        const dbUri = process.env.MONGODB_URI;

        if(!dbUri){
            logger.error(ERROR_MESSAGES.DATABASE.MONGO_URI_NOT_FOUND);
            process.exit(1);
        }

        await mongoose.connect(dbUri, options);

        logger.info(ERROR_MESSAGES.DATABASE.CONNECTION_SUCCESS, {
            database: mongoose.connection.name,
            host: mongoose.connection.host,
        });

        mongoose.connection.on("error", (err) => {
            logger.error(ERROR_MESSAGES.DATABASE.CONNECTION_ERROR, {error: err});
        })

        mongoose.connection.on("disconnect", () => {
            logger.warn(ERROR_MESSAGES.DATABASE.DISCONNECTED);    
        })

        mongoose.connection.on("reconnected", () => {
            logger.info(ERROR_MESSAGES.DATABASE.RECONNECTED);
        })    
    } catch (error) {
        logger.error(ERROR_MESSAGES.DATABASE.CONNECTION_ERROR, {error});
        process.exit(1);

    }
}
