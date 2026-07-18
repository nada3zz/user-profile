import { Router } from "express";
import { validator } from "../../../middlewares/validator.middleware";
import { controller } from "../../../middlewares/controller.middleware";
import userController from ".././controller/user.controller";
import { userValidation } from "../validator/user.validator";
import { isAuthenticated } from "../../../middlewares/isAuthenticated.middleware";

/**
 * User Routes - Endpoint Task Breakdown
 * ====================================
 *
 * ALL USER ENDPOINTS REQUIRE: isAuthenticated middleware (JWT validation)
 *
 * ENDPOINT: POST /api/users
 * Priority: P0 (Critical)
 * Task: Validate → Check email uniqueness → Hash password → Create record
 *
 * ENDPOINT: GET /api/users
 * Priority: P2 (Medium)
 * Task: Parse pagination params → Query DB with filters → Return paginated results
 *
 * ENDPOINT: GET /api/users/:id
 * Priority: P1 (High)
 * Task: Validate ID format → Query DB → Return user data
 *
 * ENDPOINT: PUT /api/users/:id
 * Priority: P1 (High)
 * Task: Validate user exists → Check email uniqueness → Update record
 *
 * ENDPOINT: DELETE /api/users/:id
 * Priority: P0 (Critical)
 * Task: Validate user exists → Remove record
 *
 * MIDDLEWARE FLOW FOR EACH ENDPOINT:
 * 1. isAuthenticated        → Verify JWT token from headers
 * 2. validator()            → Validate request data (body/params)
 * 3. controller()           → Execute business logic
 */

const router = Router();

const baseRoute = "/users";

router.post(
  "",
  isAuthenticated,
  validator(userValidation.create),
  controller(userController.CreateUser)
);

router.get(
  "",
  isAuthenticated,
  validator({} as any), 
  controller(userController.getAllUsers)
);

router.get(
  "/:id",
  isAuthenticated,
  validator(userValidation.getById),
  controller(userController.getUserById)
);


router.put(
  "/:id",
  isAuthenticated,
  validator(userValidation.update),
  controller(userController.updateUser)
);

router.delete(
  "/:id",
  isAuthenticated,
  validator(userValidation.delete),
  controller(userController.deleteUser)
);


export const userBaseRoute = baseRoute;
export const userRoutes = router;

