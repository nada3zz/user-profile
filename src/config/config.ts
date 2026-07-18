import dotenv from "dotenv";

dotenv.config();
export const PORT = process.env.APP_PORT
  ? Number(process.env.APP_PORT)
  : 3000;
export const DEVELOPMENT = process.env.NODE_ENV === "development";
export const TEST = process.env.NODE_ENV === "test";
export const PRODUCTION = process.env.NODE_ENV === "production";
export const MONGO_URI= process.env.MONGO_URI || "";
export const ACCESS_TOKEN_SECRET =(process.env.ACCESS_TOKEN_SECRET as string) || "";
