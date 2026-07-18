import { IPagination, IUpdate, ICreate } from "../interface";
import userModel from "../model/user.model";

/**
 * UserRepository - Database Layer
 * ===============================
 *
 * RESPONSIBILITY: Direct database operations on user collection
 * PRIORITY: P1 (High) - All operations depend on database integrity
 *
 * TASK DECOMPOSITION BY OPERATION:
 *
 * 1. createUser() - P0 (Critical)
 *    Subtasks:
 *    - Receive validated user data (ICreate)
 *    - Create new MongoDB document
 *    - Return created user record
 *
 * 2. getAllUsers() - P2 (Medium)
 *    Subtasks:
 *    - Parse pagination options (page, limit, search, sortOrder)
 *    - Build MongoDB query with optional search filter
 *    - Apply sorting and pagination
 *    - Execute parallel queries (users + count) for efficiency
 *    - Calculate pagination metadata
 *
 * 3. getUserByEmail() - P1 (High)
 *    Subtasks:
 *    - Query user by email (case-sensitive)
 *    - Used for duplicate email checks (data integrity)
 *
 * 4. getUserById() - P1 (High)
 *    Subtasks:
 *    - Query user by MongoDB ObjectId
 *    - Return user record or null
 *
 * 5. updateUser() - P1 (High)
 *    Subtasks:
 *    - Find and update user by ID
 *    - Return updated document
 *
 * 6. deleteUser() - P0 (Critical)
 *    Subtasks:
 *    - Find and delete user by ID
 *    - Remove from database permanently
 */

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
