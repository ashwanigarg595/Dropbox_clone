import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); // load .env variables

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

// Middleware to verify JWT token
export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      const err = new Error("No token provided");
      err.statusCode = 401;
      return next(err);      
    }

    // Extract token from header
    const token = authHeader.split(" ")[1];

    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Attach user info to request
    req.user = { id: decoded.id };

    next(); // proceed to next middleware/route
  } catch (error) {
    console.error("Auth error:", error);
    const err = new Error("Invalid token");
    err.statusCode = 401;
    return next(err);  
  }
};
