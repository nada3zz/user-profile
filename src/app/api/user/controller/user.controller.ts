import { Request, Response } from "express";
import userService from "../service/user.service";
import { ICreate } from "../interface";
import { AuthenticatedRequest } from "../../../middlewares/isAuthenticated.middleware";

class UserController {
  async CreateUser(req: AuthenticatedRequest, res: Response) {
    const data: ICreate = req.body;
    const result = await userService.createUser(data);
    return result ;
  }

  async getAllUsers(req: AuthenticatedRequest, res: Response) {
    const { page, limit, search, sortOrder } = req.query;
    const users = await userService.getAllUsers(
      {
        page: Number(page),
        limit: Number(limit),
        search: search as string,
        sortOrder: sortOrder as "asc" | "desc",
      },
    );
    return users;
  }

  async getUserById(req: AuthenticatedRequest, res: Response) {
    const id = req.user?.id;
    const  data = await userService.getUserById(id);
    return data ;
  }

  async updateUser(req: AuthenticatedRequest, res: Response) {
    const { id } = req.params;
    const data = req.body;
    const result = await userService.updateUser(id, data);
    return result;
  }

  async deleteUser(req: AuthenticatedRequest, res: Response) {
    const { id } = req.params;
    const result = await userService.deleteUser(id);
    return result;
  }
}

export default new UserController();
