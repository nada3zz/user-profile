import userRepo from "../../user/repository/user.repository";
import {
  BadRequestException,
} from "../../../../utils/exceptions";
import { comparePassword } from "../../../../utils/bcrypt";
import { signJwt } from "../../../../utils/jwt";
import {
  ILogin
} from "../interface";

class AuthService {

    async logIn(data: ILogin): Promise<{ accessToken: string }> {
      const user = await userRepo.getUserByEmail(data.email);
      if (!user || !(await comparePassword(data.password, user.password))) {
        throw new BadRequestException("Invalid credentials");
      }
      const accessToken = signJwt({ email: user.email, id: user._id });
      return { accessToken };
    }

}

export default new AuthService();
