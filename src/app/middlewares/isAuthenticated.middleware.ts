import { Request, Response, NextFunction } from "express";
import {
  ForbiddenException,
  UnauthorizedException,
} from "../../utils/exceptions";
import { verifyJwt } from "../../utils/jwt";

export interface AuthenticatedRequest extends Request {
  user?: any;
}

const isAuthenticated = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthorizedException("Unauthorized User");
  }

  const accessToken = authHeader.split(" ")[1];
  const user = verifyJwt(accessToken);

  if (user) {
    req.user = user;
    next();
  } else {
    throw new ForbiddenException("Forbidden Resource");
  }
};

export { isAuthenticated };
