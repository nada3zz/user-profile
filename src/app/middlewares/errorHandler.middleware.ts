import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode ?? 500;
  if (err.statusCode === 500) console.log(err);

  res.status(err.statusCode).json({
    status: err.statusCode,
    message: err.statusCode === 500 ? "Internal server error" : err.message,
    data: null,
  });
};
