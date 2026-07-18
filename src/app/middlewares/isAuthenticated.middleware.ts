import { Request, Response, NextFunction } from "express";
import { TokenExpiredError, JsonWebTokenError } from "jsonwebtoken";
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

  try {
    const user = verifyJwt(accessToken);

    if (!user) {
      throw new ForbiddenException("Forbidden Resource");
    }

    req.user = user;
    next();
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      throw new UnauthorizedException("Access token expired");
    }
    if (err instanceof JsonWebTokenError) {
      throw new UnauthorizedException("Invalid token");
    }
    throw err;
  }
};

export { isAuthenticated };