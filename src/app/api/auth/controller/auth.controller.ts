import { Request, Response } from "express";
import authService from "../service/auth.service";

class AuthController {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const data = await authService.logIn({ email, password });
    return { data };
  }
}

export default new AuthController();
