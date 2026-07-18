import { Request, Response, NextFunction } from "express";

interface IResponse {
  data?: any;
  message?: string;
  [key: string]: any;
}

const controller = (service: (req: Request, res: Response) => Promise<any>) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const result: IResponse = await service(req, res);
      const { data = null, message = "Success", ...rest } = result || {};
      res.json({
        data,
        message,
        ...rest
      });
    } catch (error) {
      next(error);
    }
  };
};

export { controller };
