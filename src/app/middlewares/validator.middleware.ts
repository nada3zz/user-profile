import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { ValidationException } from "../../utils/exceptions";

const convertToObject = (
  error: Joi.ValidationError
): Record<string, string> => {
  const errorMessages = error.details.reduce(
    (result: Record<string, string>, item) => {
      result[item.path[0]] = item.message;
      return result;
    },
    {}
  );
  return errorMessages;
};

const validator =
  (schemaToValidate: Joi.ObjectSchema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const schema = Joi.object(schemaToValidate);

    const { query, body, method, params } = req;

    const { error } = schema.validate(
      { ...body, ...params },
      { abortEarly: false }
    );

    if (error) {
      const validationErrorObj = convertToObject(error);
      return next(new ValidationException(validationErrorObj));
    }
    next();
  };

export { validator };
