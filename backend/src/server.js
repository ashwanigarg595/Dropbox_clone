import express from "express";
import cors from "cors";
import fileRoutes from "./routes/fileRoutes.js";
import path from "path";
import connectDB from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

// Serve uploads statically
app.use("/uploads", express.static(path.join(process.cwd(), "src/uploads")));

// Use routes
app.use("/api/files", fileRoutes);

// Fallback error handler
app.use((err, _req, res, _next) => {
  console.error("Error:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


/**
- Stores uploaded files physically on the server.
- Files are saved here by Multer.
- Each file’s metadata is stored in MongoDB (see File.js).
*/
