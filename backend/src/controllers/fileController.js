import fs from "fs";
import path from "path";
import File from "../models/fileModel.js";
import sanitize from "sanitize-filename";

/**
 * Contains logic for all file operations.
 * - getAllFiles: Fetches list of files from MongoDB
 * - uploadFile: Handles upload using Multer middleware
 * - downloadFile: Streams file for download
 * - viewFile: Returns file content for supported types
 * 
 * Handles validation, MIME type checking, and error handling through centralized error handler.
 */


// Upload File
export const uploadFile = async (req, res, next) => {
  try {
    if (!req.file) {
      const err = new Error("No file uploaded");
      err.statusCode = 400;
      return next(err);
    }

    const safeName = sanitize(req.file.originalname);
    const filePath = sanitize(req.file.filename);

    const file = new File({
      filename: req.file.filename,
      originalName: safeName,
      mimeType: req.file.mimetype,
      size: req.file.size,
      path: filePath,
      userId: req.user.id,
    });

    console.log("Saving file metadata:", file);

    await file.save();
    res.status(201).json(file);
  } catch (error) {
    console.error("Upload Error:", error);
    next(error);
  }
};

// List Files via pagination
export const getAllFiles = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const [files, total] = await Promise.all([
      File.find({ userId: req.user.id })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      File.countDocuments({ userId: req.user.id }),
    ]);

    res.json({
      files,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error("Fetch Error:", error);
    next(error);
  }
};

// Download File
export const downloadFile = async (req, res, next) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) {
      const err = new Error("File not found");
      err.statusCode = 400;
      return next(err);
    }

    const filePath = path.resolve(path.join("src/uploads", file.path));
    if (fs.existsSync(filePath)) {
      res.download(filePath, file.originalName);
    } else {
      const err = new Error("File not found on disk" + filePath);
      err.statusCode = 400;
      return next(err);
    }
  } catch (error) {
    console.error("Download Error:", error);
    next(error);
  }
};


// View File (for supported formats)
export const viewFile = async (req, res, next) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) {
      const err = new Error("File not found");
      err.statusCode = 400;
      return next(err);      
    }

    const mime = file.mimeType;
    const filePath = path.resolve(path.join("src/uploads", file.path));

    if (!fs.existsSync(filePath)) {
      const err = new Error("File not found on disk" + file);
      err.statusCode = 400;
      return next(err);      
    }

    // Supported formats
    if (
      mime.startsWith("text/") ||
      mime === "application/json" ||
      mime.startsWith("image/") ||
      mime === "application/pdf"
    ) {
      if (mime.startsWith("image/")) {
        // send base64 for images
        const data = fs.readFileSync(filePath);
        const base64 = data.toString("base64");
        return res.json({
          type: "image",
          mimeType: mime,
          content: `data:${mime};base64,${base64}`,
          name: file.originalName,
        });
      } else if (mime === "application/pdf") {
        // send base64 for pdf
        const data = fs.readFileSync(filePath);
        const base64 = data.toString("base64");
        return res.json({
          type: "pdf",
          mimeType: mime,
          content: `data:${mime};base64,${base64}`,
          name: file.originalName,
        });
      } else {
        // text or json
        const text = fs.readFileSync(filePath, "utf8");
        return res.json({
          type: "text",
          mimeType: mime,
          content: text,
          name: file.originalName,
        });
      }
    } else {
      const err = new Error("Unsupported file type for preview");
      err.statusCode = 400;
      return next(err);
    }
  } catch (error) {
    console.error("View error:", error);
    next(error);
  }
};

