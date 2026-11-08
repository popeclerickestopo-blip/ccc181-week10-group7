require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();

const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET;

app.use(cors({
  origin: process.env.CLIENT_ORIGIN || "http://localhost:5173"
}));

app.use(express.json());

// Demo user (no database required)
const demoUser = {
  id: 1,
  name: "Demo Student",
  email: "student@campusconnect.test",
  passwordHash: bcrypt.hashSync("Campus26", 10)
};

// GET: Health check
app.get("/api/v1/health", (req, res) => {
  res.status(200).json({
    status: "ok"
  });
});

// POST: Login
app.post("/api/v1/sessions", async (req, res, next) => {
  try {
    const { email, password } = req.body || {};

    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      !email.trim() ||
      !password
    ) {
      return res.status(400).json({
        error: "Email and password are required."
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const isValidEmail =
      normalizedEmail === demoUser.email &&
      await bcrypt.compare(password, demoUser.passwordHash);

    if (!isValidEmail) {
      return res.status(401).json({
        error: "Invalid email or password."
      });
    }

    const token = jwt.sign(
      { id: demoUser.id },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      token,
      user: {
        id: demoUser.id,
        name: demoUser.name,
        email: demoUser.email
      }
    });
  } catch (error) {
    next(error);
  }
});

// Middleware: Verify login token
function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      error: "Not logged in."
    });
  }

  const token = authHeader.slice(7);

  jwt.verify(token, JWT_SECRET, (error, decoded) => {
    if (error || decoded.id !== demoUser.id) {
      return res.status(401).json({
        error: "Not logged in."
      });
    }

    req.user = decoded;
    next();
  });
}

// GET: Current logged-in user
app.get("/api/v1/users/me", authenticateToken, (req, res) => {
  return res.status(200).json({
    id: demoUser.id,
    name: demoUser.name,
    email: demoUser.email
  });
});

// 404: Route not found
app.use((req, res) => {
  res.status(404).json({
    error: "Not found."
  });
});

// 500: Unexpected server error
app.use((error, req, res, next) => {
  console.error("Server error:", error.message);

  res.status(500).json({
    error: "Something went wrong."
  });
});

// Start server
if (!JWT_SECRET) {
  console.error("JWT_SECRET is missing from the .env file.");
  process.exit(1);
}

app.listen(PORT, () => {
  console.log(`CampusConnect API running at http://localhost:${PORT}`);
});