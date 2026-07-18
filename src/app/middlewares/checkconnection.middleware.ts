import mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";

export const checkConnection = (req: Request, res:Response, next:NextFunction) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      error: "Database not connected",
      status: mongoose.connection.readyState,
    });
  }
  next();
};
