import {logging, writeDateLogging} from "./middlewares/loggingMiddleware";
import {CLIENT_URL, DB_URI, SERVER_PORT} from "./config/settings";
import logger from "./config/logger";
import parserRoute from "./routes/parserRoute";
import cors from "cors";
import cookieParser from "cookie-parser";
import express, {Application} from "express";
import * as mongoose from "mongoose";
import productRoute from "./routes/productRoute";

const app: Application = express();

app.use(express.json());

app.use(cors({
    origin: CLIENT_URL,
    credentials: true
}));

app.use(cookieParser());
app.use(writeDateLogging);
app.use("/api/parsers", parserRoute);
app.use("/api/products", productRoute);
app.use(logging);

app.listen(SERVER_PORT, async () => {
    await mongoose.connect(DB_URI, {});
    logger.info(`Server Started on port ${SERVER_PORT}`);
});