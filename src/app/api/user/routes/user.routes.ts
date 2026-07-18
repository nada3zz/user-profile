import { Router } from "express";
import { validator } from "../../../middlewares/validator.middleware";
import { controller } from "../../../middlewares/controller.middleware";
import userController from ".././controller/user.controller";
import { userValidation } from "../validator/user.validator";
import { isAuthenticated } from "../../../middlewares/isAuthenticated.middleware";

const router = Router();

const baseRoute = "/users";

router.post(
  "",
  isAuthenticated,
  validator(userValidation.create),
  controller(userController.CreateUser)
);

// router.post(
//   "/login",
//   validator(userValidation.login),
//   controller(userController.logIn)
// );
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

