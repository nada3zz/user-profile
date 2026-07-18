import { Request, Response } from "express";
import userService from "../service/user.service";
import { ICreate } from "../interface";
import { AuthenticatedRequest } from "../../../middlewares/isAuthenticated.middleware";

/**
 * UserController - API Request/Response Layer
 * ============================================
 *
 * RESPONSIBILITY: Handle HTTP layer for user endpoints
 * ARCHITECTURE: Receives HTTP requests → validates → calls service → returns response
 * PRIORITY: Mixed (P0 for create/delete, P1 for read/update, P2 for list)
 *
 * REQUEST/RESPONSE FLOW:
 * 1. HTTP Request arrives at endpoint
 * 2. Middleware processes request (auth, validation)
 * 3. Extract request data (body, params, query, user context)
 * 4. Call appropriate service method
 * 5. Format service response into HTTP response
 * 6. Return to client
 * 7. Errors caught by errorHandler middleware
 */

class UserController {
  /**
   * CREATE USER ENDPOINT - Priority: P0 (Critical)
   * HTTP Flow:
   * 1. Extract validated request body (data: ICreate)
   * 2. Call userService.createUser(data)
   * 3. Service validates email uniqueness, hashes password, creates user
   * 4. Return success response with message
   * Error Handling: Caught by errorHandler middleware
   */
  async CreateUser(req: AuthenticatedRequest, res: Response) {
    const data: ICreate = req.body;
    const result = await userService.createUser(data);
    return result ;
  }

  /**
   * GET ALL USERS ENDPOINT - Priority: P2 (Medium)
   * HTTP Flow:
   * 1. Extract pagination & filter params from query (page, limit, search, sortOrder)
   * 2. Call userService.getAllUsers(options)
   * 3. Service queries DB with pagination and returns paginated results
   * 4. Return formatted response with data and metadata
   * Params: page, limit, search, sortOrder
   */
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

  /**
   * GET USER BY ID ENDPOINT - Priority: P1 (High)
   * HTTP Flow:
   * 1. Extract user ID from authenticated request context (req.user?.id)
   * 2. Call userService.getUserById(id)
   * 3. Service queries DB and returns user data
   * 4. Return formatted response with user data
   * Security: Requires authentication (AuthenticatedRequest)
   */
  async getUserById(req: AuthenticatedRequest, res: Response) {
    const id = req.user?.id;
    const  data = await userService.getUserById(id);
    return data ;
  }

  /**
   * UPDATE USER ENDPOINT - Priority: P1 (High)
   * HTTP Flow:
   * 1. Extract user ID from URL params (req.params.id)
   * 2. Extract update data from request body
   * 3. Call userService.updateUser(id, data)
   * 4. Service validates user exists, checks email uniqueness, updates record
   * 5. Return success response with message
   * Error Handling: Caught by errorHandler middleware
   */
  async updateUser(req: AuthenticatedRequest, res: Response) {
    const { id } = req.params;
    const data = req.body;
    const result = await userService.updateUser(id, data);
    return result;
  }

  /**
   * DELETE USER ENDPOINT - Priority: P0 (Critical)
   * HTTP Flow:
   * 1. Extract user ID from URL params (req.params.id)
   * 2. Call userService.deleteUser(id)
   * 3. Service validates user exists and removes from DB
   * 4. Return success response with message
   * Error Handling: Caught by errorHandler middleware
   */
  async deleteUser(req: AuthenticatedRequest, res: Response) {
    const { id } = req.params;
    const result = await userService.deleteUser(id);
    return result;
  }
}

export default new UserController();
