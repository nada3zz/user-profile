import userRepo from "../../user/repository/user.repository";
import {
  BadRequestException,
} from "../../../../utils/exceptions";
import { comparePassword } from "../../../../utils/bcrypt";
import { signJwt } from "../../../../utils/jwt";
import {
  ILogin
} from "../interface";

/**
 * AuthService - API Task Breakdown & Prioritization
 * =================================================
 *
 * PRIORITY LEVELS:
 * P0 (Critical): Core functionality essential for system authentication
 * P1 (High):     Security and data validation
 * P2 (Medium):   Error handling and response formatting
 */

class AuthService {

    /**
     * LOGIN - Priority: P0 (Critical)
     * Execution Order:
     * 1. Extract validated email & password from request
     * 2. Query user by email from database (DB lookup)
     * 3. Validate user exists (error handling)
     * 4. Compare provided password with stored hash (security)
     * 5. Throw exception if credentials invalid (security fail)
     * 6. Generate JWT token with user claims (id, email)
     * 7. Return access token to client
     */
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
