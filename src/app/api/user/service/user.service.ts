import userRepo from "../repository/user.repository";
import { encryptPassword } from "../../../../utils/bcrypt";
import { BadRequestException } from "../../../../utils/exceptions";
import { ICreate, IUser, IPagination, IUpdate } from "../interface";
import { UserType } from "../enum";

class UserService {
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

  async getUserById(id: string): Promise<{ data: IUser | null }> {
    const user = await userRepo.getUserById(id);
    return { data: user };
  }

  async updateUser(id: string, data: IUpdate): Promise<{ message: string }> {
    const email = await userRepo.getUserByEmail(data.email);
    if(email) throw new BadRequestException("This Email already exists");
    await userRepo.updateUser(id, data);
    return { message: "User has been updated successfully" };
  }

  async deleteUser(id: string): Promise<{ message: string }> {
    await userRepo.deleteUser(id);
    return { message: "User has been deleted successfully" };
  }
}

export default new UserService();
