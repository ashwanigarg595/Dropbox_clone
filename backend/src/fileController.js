import fs from "fs";
import path from "path";
import File from "./models/fileModel.js";

/**
 * Contains logic for all file operations.
 * - getAllFiles: Fetches list of files from MongoDB
 * - uploadFile: Handles upload using Multer middleware
 * - downloadFile: Streams file for download
 * - viewFile: Returns file content for supported types
 * 
 * Handles validation, MIME type checking, and error handling.
 */


// Upload File
export const uploadFile = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const file = new File({
      filename: req.file.filename,
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      size: req.file.size,
      path: req.file.path,
    });

    await file.save();
    res.status(201).json(file);
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ message: "File upload failed" });
  }
};


// List Files
export const getAllFiles = async (req, res) => {
  try {
    const files = await File.find().sort({ createdAt: -1 });
    res.json(files);
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({ message: "Error fetching files" });
  }
};


// Download File
export const downloadFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) return res.status(404).json({ message: "File not found" });

    const filePath = path.resolve(file.path);
    if (fs.existsSync(filePath)) {
      res.download(filePath, file.originalName);
    } else {
      res.status(404).json({ message: "File not found on disk" });
    }
  } catch (error) {
    console.error("Download Error:", error);
    res.status(500).json({ message: "Download failed" });
  }
};


// View File (for supported formats)
export const viewFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) return res.status(404).json({ message: "File not found" });

    const mime = file.mimeType;
    const filePath = path.resolve(file.path);

    if (!fs.existsSync(filePath))
      return res.status(404).json({ message: "File not found on disk" });

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
      return res
        .status(400)
        .json({ message: "Unsupported file type for preview" });
    }
  } catch (error) {
    console.error("View error:", error);
    res.status(500).json({ message: "View failed" });
  }
};

