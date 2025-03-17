import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Server } from 'http';
import { app, startServer } from '../src/index';

dotenv.config({ path: '.env.test' });

let server: Server;

beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI as string);
    server = await startServer() as Server;
});

afterAll(async () => {
    await mongoose.connection.close();
    if (server) {
        await new Promise<void>((resolve) => {
            server.close(() => {
                resolve();
            });
        });
    }
});