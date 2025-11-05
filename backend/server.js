import express from "express";
import cors from "cors";
import fileRoutes from "./src/routes/fileRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import path from "path";
import connectDB from "./src/db.js";
import { errorHandler } from "./src/errorHandler.js";

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

connectDB();

// Routes
app.use("/api/files", fileRoutes);
app.use("/api/auth", authRoutes);

// Attach error handler
app.use(errorHandler);

// Serve uploads statically
app.use("/uploads", express.static(path.join(process.cwd(), "src/uploads")));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


/**
- Stores uploaded files physically on the server.
- Files are saved here by Multer.
- Each file’s metadata is stored in MongoDB (see File.js).
*/
