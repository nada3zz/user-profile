import Joi from "joi";
import { escape } from "validator";

/**
 * AuthValidator - Input Validation Layer
 * ======================================
 *
 * RESPONSIBILITY: Validate login request data before processing
 * PRIORITY: P1 (High) - Security and data integrity
 */

const sanitizedString = Joi.string().custom((value, helpers) => escape(value));

/**
 * LOGIN VALIDATION SCHEMA - Priority: P1 (High)
 * Execution Order:
 * 1. Sanitize all string inputs (prevent XSS)
 * 2. Validate email is required and present
 * 3. Validate password complexity requirements
 * 4. Return validation errors if any field fails
 */
const login: any = {
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
};

export const authValidation = { login };
