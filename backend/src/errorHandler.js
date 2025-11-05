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

  const status = err.statusCode || err.status || 500;
  const message = err.message || "Internal Server Error";

  res.status(status).json({
    success: false,
    message,
  });
};


