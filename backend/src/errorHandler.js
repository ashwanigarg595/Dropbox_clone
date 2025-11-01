/**
 * errorHandler.js
 * ----------------------------
 * Centralized error-handling middleware for Express.
 * - Catches errors thrown in async routes
 * - Sends structured error responses with message & status code
 * - Improves debugging and consistency
 */

export const errorHandler = (err, req, res, next) => {
  console.error("Error:", err.message || err);
  res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
  });
};
