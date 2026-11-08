# CampusConnect API Specification

**Version:** 1.0
**Base URL:** `http://localhost:3000/api/v1`

## 1. Overview

The CampusConnect API provides authentication services for the CampusConnect login application. It uses Node.js and Express and returns data in JSON format.

## 2. Authentication

The API uses JSON Web Tokens (JWT) for authentication. A successful login returns a token that must be included in the Authorization header when accessing protected endpoints.

**Authorization format:**

`Bearer <token>`

## 3. Endpoints

### 3.1 Health Check

- **Method:** GET
- **Endpoint:** `/health`
- **Authentication:** Not required

**Successful response — 200 OK**

```json
{
  "status": "ok"
}
```

### 3.2 Login

- **Method:** POST
- **Endpoint:** `/sessions`
- **Authentication:** Not required
- **Content-Type:** `application/json`

**Request body:**

```json
{
  "email": "student@campusconnect.test",
  "password": "Campus26"
}
```

**Successful response — 200 OK**

```json
{
  "token": "<jwt-token>",
  "user": {
    "id": 1,
    "name": "Demo Student",
    "email": "student@campusconnect.test"
  }
}
```

**Missing or invalid input — 400 Bad Request**

```json
{
  "error": "Email and password are required."
}
```

**Incorrect email or password — 401 Unauthorized**

```json
{
  "error": "Invalid email or password."
}
```

### 3.3 Get Current User

- **Method:** GET
- **Endpoint:** `/users/me`
- **Authentication:** Required

**Request header:**

`Authorization: Bearer <jwt-token>`

**Successful response — 200 OK**

```json
{
  "id": 1,
  "name": "Demo Student",
  "email": "student@campusconnect.test"
}
```

**Missing, invalid, or expired token — 401 Unauthorized**

```json
{
  "error": "Not logged in."
}
```

## 4. Error Handling

| Status Code | Description |
|---|---|
| 200 | Request successful |
| 400 | Missing or invalid required input |
| 401 | Invalid credentials or authentication token |
| 404 | Endpoint not found |
| 500 | Unexpected server error |

## 5. Security

- Passwords are hashed using bcryptjs.
- JWT tokens expire after one hour.
- Protected endpoints require a valid Bearer token.
- Passwords and password hashes are never returned in API responses.
- Environment variables are stored in a private `.env` file and excluded from Git.

## 6. Demo Account

For classroom testing only:

- **Email:** `student@campusconnect.test`
- **Password:** `Campus26`

This project uses a demonstration account and does not connect to a production database.
