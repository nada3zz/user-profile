import { BaseError, httpStatusCodes } from "./baseError";

export class NotFoundException extends BaseError {
  constructor(description: string, statusCode = httpStatusCodes.NOT_FOUND) {
    super(statusCode, description, undefined);
  }
}

export class BadRequestException extends BaseError {
  constructor(
    description: string,
    type?: number,
    statusCode: number = httpStatusCodes.BAD_REQUEST
  ) {
    super(statusCode, description, { type });
  }
}

export class ForbiddenException extends BaseError {
  constructor(
    description: string,
    statusCode: number = httpStatusCodes.FORBIDDEN
  ) {
    super(statusCode, description, undefined);
  }
}

export class TemporaryRedirectException extends BaseError {
  constructor(
    redirction: string,
    description: string,
    statusCode: number = httpStatusCodes.TemporaryRedirect
  ) {
    super(statusCode, description, { redirction });
  }
}

export class ValidationException extends BaseError {
  constructor(
    validation: any[] | { [key: string]: string },
    { modelName, body }: { modelName: string; body?: any } = { modelName: "" },
    description = "validation Error",
    statusCode = httpStatusCodes.VALIDATION
  ) {
    console.log("validation ", { validation, body });
    super(statusCode, description, { validation });
  }
}

export class UnauthorizedException extends BaseError {
  constructor(description: string, statusCode = httpStatusCodes.Unauthorized) {
    super(statusCode, description, undefined);
  }
}
