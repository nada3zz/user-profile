import { Router } from "express";
import { validator } from "../../../middlewares/validator.middleware";
import { controller } from "../../../middlewares/controller.middleware";
import authController from "../controller/auth.controller";
import { authValidation } from "../validator/auth.validator";

const router = Router();

const baseRoute = "/auth";

router.post(
  "/login",
  validator(authValidation.login),
  controller(authController.login),
);

export const authBaseRoute = baseRoute;
export const authRoutes = router;
