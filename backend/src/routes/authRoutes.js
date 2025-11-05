import express from "express";
import { signup, login } from "../controllers/authController.js";

const router = express.Router();

/**
 * Defines all API endpoints related to auth handling.
 * Routes:
 *  - GET /api/auth/login → User Login
 *  - GET /api/auth/signup → User Signup
 */

// Define routes
router.post("/signup", signup);
router.post("/login", login);

export default router;
