import express from "express";
import { signup, login } from "../controllers/authController.js";

const router = express.Router();

/**
 * Defines all API endpoints related to auth handling.
 * Routes:
 *  - POST /api/auth/login → User Login
 *  - POST /api/auth/signup → User Signup
 */

// Define routes
router.post("/signup", signup);
router.post("/login", login);

export default router;
