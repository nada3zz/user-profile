import Joi from "joi";
import { escape } from "validator";

const sanitizedString = Joi.string().custom((value, helpers) => escape(value));

const createSchema: any = {
  fullName: sanitizedString.required().messages({
    "string.empty": "Full name is required",
    "any.required": "Full name is required",
  }),
  email: sanitizedString.required().messages({
    "string.empty": "Email is required",
    "any.required": "Email is required",
  }),
  password: sanitizedString
    .min(8)
    .pattern(
      new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])"),
    )
    .required()
    .messages({
      "string.empty": "Password is required",
      "any.required": "Password is required",
      "string.min": "Password must be at least 8 characters long",
      "string.pattern.base":
        "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character (!@#$%^&*)",
    }),
  age: Joi.number().integer().min(18).max(120).required().messages({
    "number.base": "Age must be a number",
    "number.integer": "Age must be a whole number",
    "number.min": "Age must be at least 18",
    "number.max": "Age cannot exceed 120",
    "any.required": "Age is required",
  }),
};

const updateSchema: any = {
  id: Joi.string().hex().length(24).required().messages({
    "any.required": "ID is required to perform an update",
    "string.hex": "ID must be a valid hexadecimal string",
    "string.length": "ID must be exactly 24 characters long",
  }),
  fullName: sanitizedString.optional().messages({
    "string.empty": "Full name cannot be empty",
  }),
  email: sanitizedString.optional().messages({
    "string.empty": "Email cannot be empty",
  }),
  age: Joi.number().integer().min(18).max(100).optional().messages({
    "number.base": "Age must be a number",
    "number.integer": "Age must be a whole number",
    "number.min": "Age must be at least 18",
    "number.max": "Age cannot exceed 100",
  }),
};

const getByIdSchema: any = {
  id: Joi.string().hex().length(24).required().messages({
    "any.required": "ID is required",
    "string.hex": "ID must be a valid hexadecimal string",
    "string.length": "ID must be exactly 24 characters long",
  }),
};

const deleteSchema: any = {
  id: Joi.string().hex().length(24).required().messages({
    "any.required": "ID is required to delete a user",
    "string.hex": "ID must be a valid hexadecimal string",
    "string.length": "ID must be exactly 24 characters long",
  }),
};

export const userValidation = {
  create: createSchema,
  update: updateSchema,
  getById: getByIdSchema,
  delete: deleteSchema,
};
