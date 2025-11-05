import express from "express";
import multer from "multer";
import {
  uploadFile,
  getAllFiles,
  downloadFile,
  viewFile,
} from "../controllers/fileController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

/**
 * Defines all API endpoints related to file handling.
 * Routes:
 *  - GET /api/files → List all files
 *  - POST /api/upload → Upload a new file
 *  - GET /api/files/:id/download → Download a file
 *  - GET /api/files/:id/view → View file content (text/image/pdf/json)
 * 
 * Uses Express Router and connects each route to its controller.
 */

const router = express.Router();

const upload = multer({
  dest: "src/uploads/",
  limits: { fileSize: 20 * 1024 * 1024 }, // 10MB
});

// Define routes
router.post("/upload", verifyToken, upload.single("file"), uploadFile);
router.get("/", verifyToken, getAllFiles);
router.get("/:id/download", verifyToken, downloadFile);
router.get("/:id/view", verifyToken, viewFile);

export default router;
