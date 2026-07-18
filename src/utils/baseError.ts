export class BaseError extends Error {
  statusCode: number;
  meta: {
    [key: string]:
      | any[]
      | { [key: string]: string }
      | undefined
      | string
      | number;
  };

  constructor(
    statusCode: number,
    description: string,
    meta: {
      [key: string]:
        | any[]
        | { [key: string]: string }
        | undefined
        | string
        | number;
    } = {}
  ) {
    super(description);

    Object.setPrototypeOf(this, new.target.prototype);
    this.statusCode = statusCode;
    this.meta = meta;
    Error.captureStackTrace(this);
  }
}

export enum httpStatusCodes {
  OK = 200,
  BAD_REQUEST = 400,
  VALIDATION = 422,
  Unauthorized = 401,
  NOT_FOUND = 404,
  INTERNAL_SERVER = 500,
  FORBIDDEN = 403,
  TemporaryRedirect = 423,
}
