import userRepo from "../repository/user.repository";
import { encryptPassword } from "../../../../utils/bcrypt";
import { BadRequestException } from "../../../../utils/exceptions";
import { ICreate, IUser, IPagination, IUpdate } from "../interface";
import { UserType } from "../enum";

/**
 * UserService - API Task Breakdown & Prioritization
 * ================================================
 *
 * PRIORITY LEVELS:
 * P0 (Critical): Core functionality that must work for the system to function
 * P1 (High):     Important features that ensure data integrity and security
 * P2 (Medium):   Operational features that enhance user experience
 *
 */

class UserService {
  /**
   * CREATE USER - Priority: P0 (Critical)
   * Execution Order:
   * 1. Extract validated input (email, password, fullName, age)
   * 2. Check email uniqueness (email validation against DB)
   * 3. Hash password using bcrypt (security)
   * 4. Set default user type (system setup)
   * 5. Create user record in DB
   * 6. Return success response
   */
  async createUser(data: ICreate): Promise<{ message: string }> {
    const { fullName, email, password, age } = data;
    const findUser = await userRepo.getUserByEmail(email);
    if (findUser) throw new BadRequestException("This Email already exists");
    const hashedPassword = await encryptPassword(password);
    const newUser: ICreate = {
      fullName,
      email,
      password: hashedPassword,
      age,
      userType: UserType.USER,
    };
    const user = await userRepo.createUser(newUser);
    return { message: "User created successfully" };
  }

  /**
   * GET ALL USERS - Priority: P2 (Medium)
   * Execution Order:
   * 1. Accept pagination options (page, limit, search, sortOrder)
   * 2. Fetch users from DB with pagination and search applied
   * 3. Get total count for pagination metadata
   * 4. Calculate total pages
   * 5. Format and return response with metadata
   */
  async getAllUsers(options: IPagination): Promise<{
    data: IUser[];
    totalCount: number;
    currentPage: number;
    totalPages: number;
  }> {
    const result = await userRepo.getAllUsers(options);
    return {
      data: result.users,
      totalCount: result.totalCount,
      currentPage: result.currentPage,
      totalPages: result.totalPages,
    };
  }

  /**
   * GET USER BY ID - Priority: P1 (High)
   * Execution Order:
   * 1. Validate ID format (MongoDB ObjectId)
   * 2. Query user from DB by ID
   * 3. Return user data (or null if not found)
   */
  async getUserById(id: string): Promise<{ data: IUser | null }> {
    const user = await userRepo.getUserById(id);
    return { data: user };
  }

  /**
   * UPDATE USER - Priority: P1 (High)
   * Execution Order:
   * 1. Validate user exists (checkUser - data integrity check)
   * 2. Validate new email uniqueness (if email is being updated)
   * 3. Apply partial updates to user record
   * 4. Persist changes to DB
   * 5. Return success response
   */
  async updateUser(id: string, data: IUpdate): Promise<{ message: string }> {
    await this.checkUser(id);
    const email = await userRepo.getUserByEmail(data.email);
    if (email) throw new BadRequestException("This Email already exists");
    await userRepo.updateUser(id, data);
    return { message: "User has been updated successfully" };
  }

  /**
   * DELETE USER - Priority: P0 (Critical)
   * Execution Order:
   * 1. Validate user exists (checkUser - data integrity check)
   * 2. Delete user record from DB
   * 3. Return success response
   */
  async deleteUser(id: string): Promise<{ message: string }> {
    await this.checkUser(id);
    await userRepo.deleteUser(id);
    return { message: "User has been deleted successfully" };
  }
  /**
   * CHECK USER - Priority: P1 (High)
   * Utility method for data integrity validation
   * Execution Order:
   * 1. Query user from DB by ID
   * 2. Throw BadRequestException if user not found
   * Used by: updateUser(), deleteUser()
   */
  private async checkUser(id: string) {
    const user = await userRepo.getUserById(id);
    if (!user) throw new BadRequestException("User doesn't exist");
  }
}

export default new UserService();
