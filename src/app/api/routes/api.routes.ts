import { Router } from "express";
import { authBaseRoute, authRoutes } from "../auth/routes/auth.routes";
import { userBaseRoute, userRoutes } from "../user/routes/user.routes";

const baseRouter = Router();

baseRouter.use(userBaseRoute, userRoutes);
baseRouter.use(authBaseRoute, authRoutes);

export const apiBaseRouter = baseRouter;
