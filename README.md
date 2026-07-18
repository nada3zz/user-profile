# User Profiles Management System

## Overview

User Profiles Management APIs are built using Node.js, Express, MongoDB, and Mongoose. This system provides comprehensive endpoints for user authentication, profile management, and role-based user administration.

## Features
- **Authentication**: JWT-based login with secure password hashing
- **User Management**: Create, read, update, and delete user profiles
- **Profile Access**: Retrieve user profiles with pagination and search capabilities
- **Data Validation**: Comprehensive input validation with detailed error messages
- **Security**: Password complexity enforcement, email uniqueness validation, XSS protection
- **Role-Based Access**: User type management (ADMIN, USER)

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- Docker and Docker Compose
- MongoDB (or use Docker)

### Installation Steps

1. **Clone the project directory**
   ```bash
   git clone https://github.com/nada3zz/user-profile
   cd user-profile
   ```

2. **Create environment file**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your configuration

3. **Run with Docker**
   ```bash
   docker-compose up --build
   ```

   After the containers are up, run the seeders inside the API container:
   ```bash
   docker-compose exec api npm run seed:user
   ```

4. **Run without Docker** (requires local MongoDB)
   ```bash
   npm install

   npm run dev
   ```


## API Endpoints

### Authentication (Public)
- `POST /api/auth/login` - Login user and receive JWT token

### User Management (Protected - Requires JWT)
- `POST /api/users` - Create new user profile
- `GET /api/users` - Get all users with pagination and search
- `GET /api/users/:id` - Get single user profile
- `PUT /api/users/:id` - Update user profile
- `DELETE /api/users/:id` - Delete user profile

## Example Usage

### 1. Login User
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123!"
  }'
```

**Response:**
```json
{
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 2. Create User
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "fullName": "John Doe",
    "email": "john@example.com",
    "password": "SecurePass123!",
    "age": 28
  }'
```

**Response:**
```json
{
  "message": "User created successfully"
}
```

### 3. Get All Users with Pagination
```bash
curl -X GET "http://localhost:3000/api/users?page=1&limit=10&search=john&sortOrder=asc" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**
```json
{
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "fullName": "John Doe",
      "email": "john@example.com",
      "age": 28,
      "userType": "USER",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "totalCount": 50,
  "currentPage": 1,
  "totalPages": 5
}
```

### 4. Get User Profile
```bash
curl -X GET http://localhost:3000/api/users/507f1f77bcf86cd799439011 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**
```json
{
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "fullName": "John Doe",
    "email": "john@example.com",
    "age": 28,
    "userType": "USER",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

### 5. Update User Profile
```bash
curl -X PUT http://localhost:3000/api/users/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "fullName": "Jane Doe",
    "age": 29
  }'
```

**Response:**
```json
{
  "message": "User has been updated successfully"
}
```

### 6. Delete User
```bash
curl -X DELETE http://localhost:3000/api/users/507f1f77bcf86cd799439011 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**
```json
{
  "message": "User has been deleted successfully"
}
```

## Validation Requirements

### User Creation & Update
| Field | Validation | Error Message |
|-------|-----------|---------------|
| **fullName** | Required, string | Full name is required |
| **email** | Required, valid email format | Email is required |
| **password** | Min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char | Password must be at least 8 characters long and contain uppercase, lowercase, number, and special character |
| **age** | Required, integer, min 18, max 100 | Age must be a number between 18 and 100 |

### Password Complexity Requirements
- Minimum 8 characters
- At least one uppercase letter (A-Z)
- At least one lowercase letter (a-z)
- At least one number (0-9)
- At least one special character (!@#$%^&*)

### Query Parameters (Get Users)
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| page | number | 1 | Page number for pagination |
| limit | number | 5 | Number of users per page |
| search | string | - | Search by fullName or email (case-insensitive) |
| sortOrder | string | asc | Sort order (asc/desc) by createdAt |

## Error Handling

The API returns appropriate HTTP status codes:
- **200**: Successful GET request
- **201**: Successful POST/PUT request
- **400**: Bad Request (validation error)
- **401**: Unauthorized (missing/invalid JWT token)
- **404**: Not Found (user doesn't exist)
- **500**: Internal Server Error

**Error Response Format:**
```json
{
  "statusCode": 400,
  "message": "Validation error message"
}
```

## Security Features

- ✅ **JWT Authentication**: Secure token-based authentication
- ✅ **Password Hashing**: Bcrypt password hashing (10 rounds)
- ✅ **XSS Protection**: Input sanitization using validator.js
- ✅ **Email Validation**: Duplicate email prevention
- ✅ **Password Complexity**: Strong password requirements
- ✅ **CORS**: Cross-origin resource sharing configured

## Project Structure

```
user-profiles/
├── src/
│   ├── app.ts                          # Express app setup
│   ├── config/
│   │   ├── config.ts                   # Configuration management
│   │   └── index.ts
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/                   # Authentication module
│   │   │   │   ├── controller/
│   │   │   │   ├── service/
│   │   │   │   ├── validator/
│   │   │   │   └── routes/
│   │   │   ├── user/                   # User management module
│   │   │   │   ├── controller/
│   │   │   │   ├── service/
│   │   │   │   ├── repository/
│   │   │   │   ├── validator/
│   │   │   │   ├── model/
│   │   │   │   ├── enum/
│   │   │   │   ├── interface/
│   │   │   │   └── routes/
│   │   │   └── routes/
│   │   └── middlewares/
│   │       ├── isAuthenticated.middleware.ts
│   │       ├── validator.middleware.ts
│   │       ├── controller.middleware.ts
│   │       ├── errorHandler.middleware.ts
│   │       └── notFound.middleware.ts
│   ├── utils/
│   │   ├── bcrypt.ts                   # Password hashing
│   │   ├── jwt.ts                      # JWT token handling
│   │   ├── dbConnection.ts             # Database connection
│   │   ├── exceptions.ts               # Custom exceptions
│   │   ├── baseError.ts                # Base error class
│   │   └── server.ts
│   └── seeders/
│       └── user.seed.ts                # Database seeders
├── docker-compose.yml
├── Dockerfile
├── tsconfig.json
├── nodemon.json
├── package.json
└── README.md
```

## Environment Variables

Create a `.env` file in the root directory then copy .env.example

## Technology Stack

- **Runtime**: Node.js (v16+)
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Token)
- **Validation**: Joi & Validator.js
- **Password Security**: Bcrypt
- **Container**: Docker & Docker Compose

## Installation & Setup

### Using Docker (Recommended)

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd user-profiles
   ```

2. Create environment file
   ```bash
   cp .env.example .env
   ```

3. Build and run with Docker Compose
   ```bash
   docker-compose up --build
   ```

4. API will be available at `http://localhost:3000`

### Local Installation

1. Prerequisites
   - Node.js v16 or higher
   - MongoDB running locally or Docker container

2. Install dependencies
   ```bash
   npm install
   ```

3. Create `.env` file with configuration

4. Start development server
   ```bash
   npm run dev
   ```

5. Build for production
   ```bash
   npm run build
   npm start
   ```

## Available Scripts

```bash
# Development
npm run dev                    # Start with nodemon

# Production
npm run build                  # Compile TypeScript
npm start                      # Run compiled code

# Database
npm run seed                   # Seed database with sample data
```

## API Documentation

For detailed API task breakdown and prioritization, see [API_BREAKDOWN.md](API_BREAKDOWN.md) which includes:
- Task decomposition and prioritization (P0, P1, P2)
- Request/response flow documentation
- Middleware execution pipeline
- Security and validation checklist
- Error handling flow

## Contributing

1. Follow the established code structure
2. Add proper JSDoc comments
3. Validate all inputs
4. Handle errors appropriately
5. Write tests for new features

## License

This project is licensed under the MIT License.

## Support

For issues or questions, please create an issue in the repository or contact the development team.
```