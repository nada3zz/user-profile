import Joi from "joi";
import { escape } from "validator";

const sanitizedString = Joi.string().custom((value, helpers) => escape(value));

const createSchema: any = {
  fullName: sanitizedString.required(),
  email: sanitizedString.required(),
  password: sanitizedString
    .min(8)
    .pattern(
      new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])"),
    )
    .required(),
  age: Joi.number().required(),
};

const updateSchema: any = {
  fullName: sanitizedString.optional(),
  email: sanitizedString.optional(),
  age: Joi.number().optional(),
};

const getByIdSchema: any = {
  id: Joi.string().required(),
};

const deleteSchema: any = {
  id: Joi.string().required(),
};

export const userValidation = {
  create: createSchema,
  update: updateSchema,
  getById: getByIdSchema,
  delete: deleteSchema,
};
