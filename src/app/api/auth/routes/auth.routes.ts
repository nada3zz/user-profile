import { Router } from "express";
import { validator } from "../../../middlewares/validator.middleware";
import { controller } from "../../../middlewares/controller.middleware";
import authController from "../controller/auth.controller";
import { authValidation } from "../validator/auth.validator";

/**
 * Auth Routes - Endpoint Task Breakdown
 * ====================================
 *
 * ENDPOINT: POST /api/auth/login
 * Priority: P0 (Critical)
 * Purpose: Authenticate user and issue JWT token
 *
 * MIDDLEWARE CHAIN:
 * 1. validator(authValidation.login)
 *    Task: Validate email & password format
 *    - Ensures required fields present
 *    - Checks email format validity
 *    - Validates password minimum requirements
 *
 * 2. controller(authController.login)
 *    Task: Execute login business logic
 *    - Extract credentials from request body
 *    - Call authService.logIn()
 *    - Service validates against database
 *    - Generate JWT token on success
 *    - Return token or error
 */

const router = Router();

const baseRoute = "/auth";

router.post(
  "/login",
  validator(authValidation.login),
  controller(authController.login),
);

export const authBaseRoute = baseRoute;
export const authRoutes = router;
