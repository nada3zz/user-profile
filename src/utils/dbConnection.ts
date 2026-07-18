import mongoose from "mongoose";
import { MONGO_URI } from "../config";


export const connectDB = async (): Promise<void> => {
  try {
    if (!MONGO_URI) {
      console.error("FATAL ERROR: MONGO_URI is not defined.");
    }
    await mongoose.connect(
      MONGO_URI 
    );
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};
