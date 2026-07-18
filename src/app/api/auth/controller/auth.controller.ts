import { Request, Response } from "express";
import authService from "../service/auth.service";

/**
 * AuthController - API Request/Response Layer
 * ==========================================
 *
 * RESPONSIBILITY: Handle HTTP layer for authentication endpoints
 * PRIORITY: P0 (Critical) - All endpoints are authentication critical
 *
 * REQUEST FLOW:
 * 1. HTTP Request arrives at endpoint
 * 2. Middleware validation (validator middleware checks request)
 * 3. Extract request data (body, params, query)
 * 4. Call appropriate service method
 * 5. Handle service response/errors
 * 6. Format and return HTTP response
 */

class AuthController {
  /**
   * LOGIN ENDPOINT - Priority: P0 (Critical)
   * HTTP Flow:
   * 1. Extract email & password from request body
   * 2. Call authService.logIn() with credentials
   * 3. Service validates credentials and generates token
   * 4. Format success response with access token
   * 5. Return to client
   * Error Handling: Caught by errorHandler middleware
   */
  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const data = await authService.logIn({ email, password });
    return { data };
  }
}

export default new AuthController();
