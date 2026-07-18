import { Router } from "express";
import { authBaseRoute, authRoutes } from "../auth/routes/auth.routes";
import { userBaseRoute, userRoutes } from "../user/routes/user.routes";

/**
 * API Routes - Task Decomposition & Prioritization
 * =================================================
 *
 * ROUTE STRUCTURE:
 * ================
 *
 * /api (Base)
 *   ├─ /auth (Priority: P0 - Critical)
 *   │   └─ POST /login → AuthController.login()
 *   │       Task: Validate credentials → Generate JWT token
 *   │
 *   └─ /users (Priority: P0, P1, P2 - Mixed)
 *       ├─ POST /              → UserController.CreateUser()         [P0 - Critical]
 *       │  Task: Validate → Check email uniqueness → Hash password → Create record
 *       │
 *       ├─ GET /               → UserController.getAllUsers()        [P2 - Medium]
 *       │  Task: Parse pagination → Query DB → Format response
 *       │
 *       ├─ GET /:id            → UserController.getUserById()        [P1 - High]
 *       │  Task: Validate user exists → Query user → Return data
 *       │
 *       ├─ PATCH /:id          → UserController.updateUser()         [P1 - High]
 *       │  Task: Validate user → Check email → Update record
 *       │
 *       └─ DELETE /:id         → UserController.deleteUser()         [P0 - Critical]
 *          Task: Validate user exists → Remove record
 *
 * MIDDLEWARE CHAIN (Applied before routes):
 * - CORS headers
 * - Request body parsing
 * - Connection verification
 */

const baseRouter = Router();

baseRouter.use(userBaseRoute, userRoutes);
baseRouter.use(authBaseRoute, authRoutes);

export const apiBaseRouter = baseRouter;
