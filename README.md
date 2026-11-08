# CampusConnect – Mobile-First Login Page and API Integration

**CCC181 | Week 10–13 Group Activity**  
**Group 7 | Section A**

CampusConnect is a mobile-first login application developed using React, TypeScript, and Express.js. This project demonstrates responsive web design, backend API development, JWT authentication, and GitHub collaboration.

## Project Structure

- `CCC181_Week10_Activity_Starter-Kit/ccc181-week10-login-starter/` – React frontend
- `server/` – Express backend and authentication API
- `docs/API-SPEC.md` – API documentation
- `docs/postman/CampusConnect.postman_collection.json` – Postman collection
- `screenshots/` – Activity and testing screenshots

## Requirements

- Node.js and npm
- Git
- A web browser

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/popeclerickestopo-blip/ccc181-week10-group7.git
cd ccc181-week10-group7
```

### 2. Set up the backend

```bash
cd server
npm install
```

Copy `.env.example` and rename the copy to `.env`.

Configure the environment variables in `server/.env`:

```env
PORT=3000
JWT_SECRET=your_private_random_secret
CLIENT_ORIGIN=http://localhost:5173
```

Start the backend:

```bash
npm start
```

The API runs at `http://localhost:3000`.

### 3. Set up the frontend

Open another terminal and navigate to:

```text
CCC181_Week10_Activity_Starter-Kit/ccc181-week10-login-starter
```

Install dependencies:

```bash
npm install
```

Copy `.env.example` and rename the copy to `.env`.

Configure the frontend environment variable:

```env
VITE_API_URL=http://localhost:3000/api/v1
```

Start the frontend:

```bash
npm run dev
```

Open the local URL provided by Vite, usually `http://localhost:5173`.

## Demo Account

| Field | Value |
|---|---|
| Email | student@campusconnect.test |
| Password | Campus26 |
| Name | Demo Student |

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/v1/health` | Checks API status |
| POST | `/api/v1/sessions` | Authenticates a user |
| GET | `/api/v1/users/me` | Retrieves the current authenticated user |

For request details, response examples, and status codes, see [`docs/API-SPEC.md`](docs/API-SPEC.md).

## Authentication Features

- Login using email and password.
- Password verification using bcryptjs.
- JWT-based authentication.
- Protected current-user endpoint.
- Session restoration using the saved token.
- Logout by clearing the session token.
- Friendly error messages for failed login and connection problems.

## Responsive Design

The frontend follows a mobile-first approach using plain CSS, Flexbox, Grid, and responsive media queries.

The layout was designed and tested at these viewport widths:

- 360px – Mobile
- 768px – Tablet
- 1024px – Desktop
- 1280px – Large desktop

## Screenshots

Screenshots of the responsive layouts and API tests are stored in the `screenshots/` folder.

- `360.png`
- `768.png`
- `1024.png`
- `1280.png`
- `postman-health.png`
- `postman-login-200.png`
- `postman-login-401.png`
- `postman-me-401.png`
- `login-fail-360.png`
- `login-success-360.png`

## Group Members and Contributions

| Member | Name | GitHub Username | Contribution |
|---|---|---|---|
| 1 | Pope Clerick T. Estopo | popeclerickestopo | Backend development, API integration, and project management |
| 2 | John Hendrex L. Emperio | Tzoy-web | To be completed by member |
| 3 | Kristoff Laurence A. Andam | kris2ff | To be completed by member |

Each member should update their contribution based on their actual work.

## What We Learned

Through this activity, our group learned how to develop a responsive login application and connect a frontend to a backend API. We practiced implementing authentication using bcryptjs and JSON Web Tokens, testing API endpoints, and managing environment variables. We also improved our collaboration skills through Git, GitHub branches, commits, and pull requests.

## Security Notes

- Never commit actual `.env` files.
- Keep JWT secrets private.
- Use the provided `.env.example` files as setup references.
- The demo account is for classroom testing only.
