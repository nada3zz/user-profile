import { IPagination, IUpdate, ICreate } from "../interface";
import userModel from "../model/user.model";

class UserRepository {
  
  async createUser(data: ICreate) {
    const user = await userModel.create(data);
    return user;
  }

  async getAllUsers(options: IPagination = {}) {
    const { page = 1, limit = 5, search, sortOrder = "asc" } = options;

    const query: Record<string, any> = {};

    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (page - 1) * limit;
    const sortDirection = sortOrder === "desc" ? -1 : 1;

    const [users, totalCount] = await Promise.all([
      userModel
        .find(query)
        .sort({ createdAt: sortDirection })
        .skip(skip)
        .limit(limit),
      userModel.countDocuments(query),
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return {
      users,
      totalCount,
      currentPage: page,
      totalPages,
    };
  }

  async getUserByEmail(email: string) {
    const user = await userModel.findOne({ email });
    return user;
  }

  async getUserById(id: string) {
    const user = await userModel.findById(id);
    return user;
  }

  async updateUser(id: string, data: IUpdate) {
    const user = await userModel.findByIdAndUpdate(id, data, { new: true }); //new ?
    return user;
  }

  async deleteUser(id: string) {
    const user = await userModel.findByIdAndDelete(id);
    return user;
  }
}

export default new UserRepository();
