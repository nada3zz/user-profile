import { Request, Response, NextFunction } from "express";
import { NotFoundException } from "../../utils/exceptions";

export const notFound = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  next(new NotFoundException(`Cannot ${req.method} ${req.originalUrl}`));
};
