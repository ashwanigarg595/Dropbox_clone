import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import dotenv from "dotenv";

dotenv.config(); // load .env variables

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

/**
 * Contains logic for User Login and SignUp.
 */

// User Signup
export const signup = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    console.log("Signup attempt for user:", username);
    if (!username || !password) {
      const err = new Error("Username and password required");
      err.statusCode = 400;
      return next(err);
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      const err = new Error("Username already exists");
      err.statusCode = 400;
      return next(err);  
    }

    const hashed = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, password: hashed });

    const token = jwt.sign({ id: newUser._id, username }, JWT_SECRET, { expiresIn: "1d" });
    res.status(201).json({ token, user: { id: newUser._id, username } });

  } catch (err) {
    next(err);
  }
};

// User Login
export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      const err = new Error("User not found");
      err.statusCode = 400;
      return next(err);
        
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      const err = new Error("Invalid credentials");
      err.statusCode = 400;
      return next(err);
    }

    const token = jwt.sign({ id: user._id, username }, JWT_SECRET, { expiresIn: "1d" });
    res.json({ token, user: { id: user._id, username: user.username } });
    
  } catch (err) {
    next(err);
  }
};
