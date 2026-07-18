import express from "express";
import cors from "cors";
import { apiBaseRouter } from "./app/api/routes/api.routes";
import { errorHandler } from "./app/middlewares/errorHandler.middleware";
import { notFound } from "./app/middlewares/notFound.middleware";
import { checkConnection } from "./app/middlewares/checkconnection.middleware";
import { connectDB } from "./utils/dbConnection";


export const app = express();

connectDB();


app.use(
  cors({
    origin: "*",
    maxAge: 86400,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(checkConnection);
app.use("/api", apiBaseRouter);

app.use(notFound);

app.use(errorHandler);

